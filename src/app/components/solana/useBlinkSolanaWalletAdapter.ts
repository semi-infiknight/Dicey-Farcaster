'use client';
import {
    createSignMessageText,
    type SignMessageVerificationOptions,
    verifySignMessageData,
} from '@dialectlabs/blinks-core';
import { BlinkSolanaConfig } from '@dialectlabs/blinks-core/solana';

import type { SignMessageData } from '@solana/actions-spec';
import { type SolanaWalletProvider } from "@farcaster/frame-sdk"
import { Connection, VersionedTransaction } from '@solana/web3.js';
import bs58 from 'bs58';
import { useCallback, useEffect, useMemo, useState } from 'react';



// This approach is written in MDN.
// btoa does not support utf-8 characters. So we need a little bit hack.
export const encodeBase64 = (buf: ArrayBufferLike): string => {
    let binary = '';
    const bytes = new Uint8Array(buf);
    for (let i = 0, len = bytes.length; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
};

// atob does not support utf-8 characters. So we need a little bit hack.
export const decodeBase64 = (str: string): Uint8Array => {
    const binary = atob(str);
    const bytes = new Uint8Array(new ArrayBuffer(binary.length));
    const half = binary.length / 2;
    for (let i = 0, j = binary.length - 1; i <= half; i++, j--) {
        bytes[i] = binary.charCodeAt(i);
        bytes[j] = binary.charCodeAt(j);
    }
    return bytes;
};


/**
 * Hook to create a blink adapter using solana's wallet adapter.
 *
 * Be sure to call `blink.setAdapter` with the to update the adapter, every time the instance updates.
 *
 * @param rpcUrlOrConnection
 * @see {BlinkInstance}
 */
export function useBlinkSolanaWalletAdapter(
    rpcUrlOrConnection: string | Connection,
    wallet: SolanaWalletProvider | null,
) {
    const finalConnection = useMemo(() => {
        return typeof rpcUrlOrConnection === 'string'
            ? new Connection(rpcUrlOrConnection, 'confirmed')
            : rpcUrlOrConnection;
    }, [rpcUrlOrConnection]);

    const adapter = useMemo(() => {
        function verifySignDataValidity(
            data: string | SignMessageData,
            opts: SignMessageVerificationOptions,
        ) {
            if (typeof data === 'string') {
                // skip validation for string
                return true;
            }
            const errors = verifySignMessageData(data, opts);
            if (errors.length > 0) {
                console.warn(
                    `[@dialectlabs/blinks] Sign message data verification error: ${errors.join(', ')}`,
                );
            }
            return errors.length === 0;
        }

        return new BlinkSolanaConfig(finalConnection, {
            connect: async () => {
                try {
                    const result = await wallet?.request({
                        method: 'connect',
                    });
                    return result?.publicKey.toString() ?? null;
                } catch {
                    return null;
                }
            },
            signTransaction: async (txData: string) => {
                try {
                    const tx = await wallet?.signAndSendTransaction({
                        transaction: VersionedTransaction.deserialize(decodeBase64(txData)) as any,
                    });
                    return { signature: tx?.signature ?? '' };
                } catch {
                    return { error: 'Signing failed.' };
                }
            },
            signMessage: async (
                data: string | SignMessageData,
            ): Promise<
                | { signature: string }
                | {
                    error: string;
                }
            > => {
                if (!wallet?.signMessage || !wallet?.request) {
                    return { error: 'Signing failed.' };
                }
                try {
                    // Optional data verification before signing
                    const isSignDataValid = verifySignDataValidity(data, {
                        expectedAddress: (await wallet?.request({
                            method: 'connect',
                        })).publicKey.toString(),
                    });
                    if (!isSignDataValid) {
                        return { error: 'Signing failed.' };
                    }
                    const text =
                        typeof data === 'string' ? data : createSignMessageText(data);
                    const signed = await wallet?.signMessage(text);
                    return { signature: signed.signature };
                } catch (e) {
                    return { error: 'Signing failed.' };
                }
            },
        });
    }, [finalConnection, wallet]);

    return { adapter };
}

// backwards compatibility
export { useBlinkSolanaWalletAdapter as useActionSolanaWalletAdapter };