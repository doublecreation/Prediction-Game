import * as React from "react"
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  HStack,
  Flex,
  Button,
  Text,
  chakra,
  useBreakpoint
} from "@chakra-ui/react"
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  ColumnDef,
  SortingState,
  getSortedRowModel,
  getPaginationRowModel
} from "@tanstack/react-table"
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from "react-icons/fa"
import { PoolTableMobile } from "./PoolTableMobile"

export type DataTableProps<Data extends object> = {
  data: Data[]
  columns: ColumnDef<Data, any>[]
}

export const PoolTable = <Data extends object>({
  data,
  columns
}: DataTableProps<Data>) => {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    autoResetPageIndex: false,
    state: {
      sorting
    }
  })

  const breakpoint = useBreakpoint()

  return (
    <Flex flexDir="column" w="full" gap={{ base: 4, md: 8 }}>
      {breakpoint === "base" || breakpoint === "sm" ? (
        table.getRowModel().rows.map((row) => <PoolTableMobile row={row} />)
      ) : (
        <Table pos="relative">
          <Thead w="full">
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  // see https://tanstack.com/table/v8/docs/api/core/column-def#meta to type this correctly
                  const meta: any = header.column.columnDef.meta
                  return (
                    <Th
                      key={header.id}
                      _first={{
                        roundedStart: "1.25em"
                      }}
                      _last={{ roundedEnd: "1.25em" }}
                      bg="offwhite.2"
                      _dark={{ bg: "gray.700", color: "white" }}
                      fontSize="14"
                      textTransform="capitalize"
                      onClick={header.column.getToggleSortingHandler()}
                      borderBottom="none"
                      fontWeight="400"
                      isNumeric={meta?.isNumeric}
                    >
                      <Flex gap={1}>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {header.column.getIsSorted() ? (
                          header.column.getIsSorted() === "desc" ? (
                            <FaArrowAltCircleDown aria-label="sorted descending" />
                          ) : (
                            <FaArrowAltCircleUp aria-label="sorted ascending" />
                          )
                        ) : null}
                      </Flex>
                    </Th>
                  )
                })}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table.getRowModel().rows.map((row) => (
              <Tr
                key={row.id}
                rounded="1.25em"
                _hover={{ bg: "whiteAlpha.700", shadow: "md" }}
                _dark={{
                  _hover: { bg: "gray.700" }
                }}
                pos="relative"
                top="1rem"
              >
                {row.getVisibleCells().map((cell) => {
                  // see https://tanstack.com/table/v8/docs/api/core/column-def#meta to type this correctly
                  const meta: any = cell.column.columnDef.meta
                  return (
                    <Td
                      _first={{ roundedStart: "1.25em" }}
                      _last={{ roundedEnd: "1.25em" }}
                      borderBottom="none"
                      key={cell.id}
                      isNumeric={meta?.isNumeric}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Td>
                  )
                })}
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}

      <HStack w="full" justify="center">
        <Button
          w="1rem"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {"<<"}
        </Button>
        <Button
          w="1rem"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </Button>
        <Text fontWeight="bold">
          {table.getState().pagination.pageIndex + 1}{" "}
          <chakra.span fontWeight="400" px={"2px"}>
            of
          </chakra.span>{" "}
          {table.getPageCount()}
        </Text>
        <Button
          w="1rem"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </Button>
        <Button
          w="1rem"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {">>"}
        </Button>
      </HStack>
    </Flex>
  )
}
