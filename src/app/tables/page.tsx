import IconLoading from "@components/icons/IconLoading/IconLoading";
import { Combobox, TComboboxItem } from "@components/primitives/ui/combobox";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { useSchemas } from "@ts/db/hooks/useSchemas";
import { useSchemaTables } from "@ts/db/hooks/useSchemaTables";
import { useEffect, useState } from "react";
import { useTable } from "@ts/db/hooks/useTable";
import { DataGridQ } from "@components/dataGrid/DataGridQ";
import { TableList } from "@components/tableList/TableList";
import DataGridFooter from "@components/dataGrid/DataGridFooter";
import DashboardSidebar from "@components/dashboard/DashboardSidebar";
import DashboardPageWrapper from "@components/dashboard/DashboardPageWrapper";
import DashboardMainArea from "@components/dashboard/DashboardMainArea";

export default function TablesPage() {
  const {
    data: schemasData,
    isLoading: schemasIsLoading,
    isError: schemasIsError,
    isRefetching: schemasIsRefetching,
  } = useSchemas();

  const getSchemasData = () =>
    schemasData?.map((s) => ({
      value: s,
      label: s,
    }));

  const getSchemasValue = () =>
    schemasData?.includes("public")
      ? "public"
      : schemasData?.[0]
      ? schemasData[0]
      : undefined;

  let [schemas, setSchemas] = useState<TComboboxItem[] | undefined>(
    getSchemasData()
  );

  const [schemaValue, setSchemaValue] = useState<string | undefined>(
    getSchemasValue()
  );

  useEffect(() => {
    if (!schemasData) return;
    setSchemaValue(getSchemasValue());
    setSchemas(getSchemasData());
  }, [schemasData]);

  const {
    data: schemaTablesData,
    isLoading: schemaTablesIsLoading,
    isRefetching: schemaTablesIsRefetching,
    isError: schemaTablesIsError,
  } = useSchemaTables(schemaValue);

  const getSelectedTable = () =>
    schemaTablesData?.[0]?.table_name
      ? schemaTablesData[0].table_name
      : schemaTablesData?.length === 0
      ? null
      : undefined;

  const [selectedTable, setSelectedTable] = useState<string | null>(
    getSelectedTable()
  );

  const doesTableBelongToSchema =
    schemaTablesData?.map((s) => s.table_name).includes(selectedTable) ?? false;

  useEffect(() => {
    if (doesTableBelongToSchema) return;
    setSelectedTable(undefined);
  }, [schemaValue]);

  useEffect(() => {
    if (!schemaTablesData) return;
    setSelectedTable(getSelectedTable());
  }, [schemaTablesData]);

  const {
    data: tableData,
    isLoading: tableDataIsLoading,
    isError: tableDataIsError,
    columns,
    rows,
  } = useTable({
    schemaName: doesTableBelongToSchema ? schemaValue : undefined,
    tableName: doesTableBelongToSchema ? selectedTable : undefined,
  });

  const [schemaOpen, setSchemaOpen] = useState<boolean>(false);

  const isTableListLoading =
    schemaValue === undefined ||
    selectedTable === undefined ||
    schemaTablesIsLoading ||
    schemaTablesData === null;

  const isTableLoading =
    schemaValue === undefined ||
    selectedTable === undefined ||
    schemasIsLoading ||
    schemaTablesIsLoading ||
    tableDataIsLoading;

  const isTableNonexistent =
    !schemasIsLoading &&
    !schemaTablesIsLoading &&
    !tableDataIsLoading &&
    tableData === null;

  return (
    <DashboardPageWrapper>
      <DashboardSidebar title="Table Editor">
        <section className="w-full flex flex-col pt-1">
          <div className="w-full flex flex-col">
            <div className="w-full px-5 py-2 flex items-center">
              <p className="font-bold text-lg flex-shrink min-w-0 overflow-hidden overflow-ellipsis pr-2">
                Schema
              </p>
              {schemasIsRefetching && (
                <IconLoading
                  className="w-4 h-4"
                  colorClassName="bg-foreground/60"
                />
              )}
            </div>
            <div className="w-full px-3">
              <Combobox
                isLoading={schemasIsLoading || schemaValue === undefined}
                isError={schemasIsError}
                value={schemaValue}
                setValue={setSchemaValue}
                open={schemaOpen}
                setOpen={setSchemaOpen}
                items={schemas}
                noResultText="No schemas found"
                notSelectedText="Select a schema"
                searchPlaceholder="Search schemas"
                SelectedItemIcon={DocumentTextIcon}
              />
            </div>
          </div>
        </section>
        <section className="w-full flex flex-col pt-3">
          <div className="w-full px-5 py-2 flex items-center">
            <p className="font-bold text-lg flex-shrink min-w-0 overflow-hidden overflow-ellipsis pr-2">
              Tables
            </p>
            {schemaTablesIsRefetching && (
              <IconLoading
                className="w-4 h-4"
                colorClassName="bg-foreground/60"
              />
            )}
          </div>
          <div className="w-full flex flex-col">
            <TableList
              isLoading={isTableListLoading}
              isError={schemaTablesIsError}
              data={schemaTablesData}
              selectedTable={selectedTable}
              setSelectedTable={setSelectedTable}
            />
          </div>
        </section>
      </DashboardSidebar>
      <DashboardMainArea>
        <DataGridQ
          columns={columns}
          rows={rows}
          isLoading={isTableLoading}
          isError={tableDataIsError}
          isNonexistent={isTableNonexistent}
        />
        <DataGridFooter minPage={1} maxPage={10} currentPage={1} />
      </DashboardMainArea>
    </DashboardPageWrapper>
  );
}
