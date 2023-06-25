import { useQuery } from '@tanstack/react-query'
import { useStarknet } from '../providers'
import { chainById, Chain } from '../network'

/** Value returned from `useNetwork`. */
export interface UseNetworkResult {
  /** The current chain. */
  chain?: Chain
}

/**
 * Hook for accessing the current connected chain.
 *
 * @remarks
 *
 * The network object contains information about the
 * network.
 *
 * @example
 * This example shows how to display the current network name.
 * ```tsx
 * function Component() {
 *   const { chain } = useNetwork()
 *
 *   return <span>{chain.name}</span>
 * }
 */
export function useNetwork(): UseNetworkResult {
  const { library } = useStarknet()

  const { data: chain } = useQuery([], async () => {
    if (!library) {
      return undefined
    }

    return chainById(await library.getChainId())
  })

  return { chain }
}
