import {
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  VStack
} from "@chakra-ui/react"
import { useChain } from "@cosmos-kit/react"
import { Row, flexRender } from "@tanstack/react-table"
import { FarmIcon } from "components/Assets/FarmIcon"
import { useClaimRewards } from "hooks/pool/useClaimRewards"
import { useRewardAmount } from "hooks/pool/useRewardAmount"
import { FaChevronRight } from "react-icons/fa"
import { HiExternalLink } from "react-icons/hi"
import { useNavigate } from "react-router-dom"
import { TPoolWithBalance } from "utils/tokens/pools"

export const PoolTableMobile = ({ row }: { row: Row<any> }) => {
  const navigate = useNavigate()

  const { isWalletConnected } = useChain("juno")

  const [rewardAmount] = useRewardAmount({
    pool: row.original.pool
  })

  const { mutate: handleClaimRewards, isLoading: isExecutingClaim } =
    useClaimRewards({
      pool: row.original.pool
    })

  return (
    <Menu matchWidth isLazy offset={[0, -5]}>
      {({ isOpen }) => (
        <>
          <MenuButton
            as={Flex}
            key={row.id}
            _hover={{ bg: "white", cursor: "pointer", shadow: "md" }}
            bg="white"
            _dark={{
              bgGradient: "linear(to-b, gray.600, gray.700) linear",
              _hover: { bg: "gray.700" }
            }}
            pos="relative"
            flexDir="column"
            roundedTop="1.25em"
            roundedBottom={isOpen ? "0" : "1.25em"}
            transition="0.2s all"
            px={3}
            py={3}
          >
            <VStack align="start" w="full" spacing={3}>
              {row.getVisibleCells().map((cell, index) => {
                if (index === 3) {
                  return null
                }
                if (index === 0) {
                  return (
                    <Flex mb={2} key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Flex>
                  )
                }
                return (
                  <Flex key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Flex>
                )
              })}
            </VStack>

            <IconButton
              size="sm"
              bg="transparent"
              aria-label="Go to pools page"
              icon={<FaChevronRight size="14" />}
              pos="absolute"
              top="calc(50% - 1rem)"
              right="1rem"
            />
          </MenuButton>
          <MenuList
            roundedTop="0"
            roundedBottom="1.25em"
            border="none"
            shadow="none"
            fontFamily="heading"
            fontSize="20"
          >
            <MenuItem
              icon={<HiExternalLink />}
              onClick={() => {
                navigate(`/pool/${row.original.pool.poolId}`)
              }}
            >
              Open Pool
            </MenuItem>
            {isWalletConnected && (
              <MenuItem
                icon={<FarmIcon />}
                onClick={() => {
                  handleClaimRewards()
                }}
                isDisabled={rewardAmount! <= 0}
              >
                Claim Rewards
              </MenuItem>
            )}
          </MenuList>
        </>
      )}
    </Menu>
  )
}
