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
  chakra
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
import { useEffect, useMemo } from "react"
import { useLocalStorageState } from "ahooks"

export type DataTableProps<Data extends object> = {
  data: Data[]
  columns: ColumnDef<Data, any>[]
}

export const PortfolioTable = <Data extends object>({
  data,
  columns,
  favourites
}: DataTableProps<Data> & { favourites: Array<string> }) => {
  const [sorting, setSorting] = React.useState<SortingState>([])

  const { favoriteRows, otherRows } = useMemo(() => {
    const favoriteRows = data.filter((row) =>
      // @ts-ignore
      favourites.includes(row.token.token)
    )
    const otherRows = data.filter(
      // @ts-ignore
      (row) => !favourites.includes(row.token.token)
    )

    return { favoriteRows, otherRows }
  }, [columns, data, favourites])

  const table = useReactTable({
    columns,
    data: otherRows,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting
    }
  })

  const favTable = useReactTable({
    columns,
    data: favoriteRows,
    getCoreRowModel: getCoreRowModel()
  })

  return (
    <Flex flexDir="column" w="full">
      <Table pos="relative">
        <Thead w="full">
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id} shadow="md" rounded="1.25em">
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
                    bg="white"
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
          {favTable.getRowModel().rows.map((row) => (
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                )
              })}
            </Tr>
          ))}
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                )
              })}
            </Tr>
          ))}
        </Tbody>
      </Table>
      <HStack pt={8} w="full" justify="center">
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
