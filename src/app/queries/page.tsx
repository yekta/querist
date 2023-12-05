import DashboardMainArea from "@components/dashboard/DashboardMainArea";
import DashboardPageWrapper from "@components/dashboard/DashboardPageWrapper";
import DashboardSidebar from "@components/dashboard/DashboardSidebar";
import { Button } from "@components/primitives/ui/button";
import QueryEditor from "@components/queryEditor/QueryEditor";
import { useMonaco } from "@monaco-editor/react";
import { connectionString } from "@ts/db/connectionString";
import { TTableResult } from "@ts/db/hooks/useTable";
import { getGridColsAndRowsFromTableResult } from "@components/dataGrid/helpers";
import { useState } from "react";
import { Column } from "react-data-grid";
import { DataGridQ, TRow } from "@components/dataGrid/DataGridQ";
import { useLoadingState } from "@ts/utils/useLoadingState";
import IconLoading from "@components/icons/IconLoading/IconLoading";
import { PlayIcon, DocumentTextIcon } from "@heroicons/react/24/outline";

export default function QueriesPage() {
  const monaco = useMonaco();
  const [columns, setColumns] = useState<Column<TRow, any>[]>([]);
  const { isLoading, isError, setIsLoading, setIsError } = useLoadingState();
  const [rows, setRows] = useState<any[]>([]);
  const [resultLength, setResultLength] = useState<number | undefined>(
    undefined
  );

  async function handleRunClick() {
    setIsLoading(true);
    setIsError(false);
    const query = monaco.editor.getEditors()[0].getValue();
    try {
      const res = await runQuery(query, connectionString);
      const { cols, rows } = getGridColsAndRowsFromTableResult({
        data: res,
        hasSelect: false,
      });
      setColumns(cols);
      setRows(rows);
      setResultLength(res.rows.length);
      console.log(res);
    } catch (error) {
      console.log(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <DashboardPageWrapper>
      <DashboardSidebar title="Query Editor">
        <></>
      </DashboardSidebar>
      <DashboardMainArea>
        <section className="w-full flex-1">
          <QueryEditor monaco={monaco} />
        </section>
        <section className="w-full flex-1 flex flex-col border-t border-border overflow-hidden z-10">
          <div className="w-full flex items-center justify-start p-2.5">
            <div className="w-[10rem] flex-shrink min-w-0 px-2.5 flex items-center">
              <p className="text-lg font-bold">Results</p>
              {isLoading ? (
                <IconLoading
                  className="w-3.5 h-3.5 ml-2"
                  colorClassName="bg-foreground/60"
                />
              ) : (
                resultLength !== undefined && (
                  <span className="text-foreground/60 font-normal text-sm px-1">
                    ({resultLength})
                  </span>
                )
              )}
            </div>
            <div className="flex items-center justify-start gap-2">
              <Button
                onClick={handleRunClick}
                variant="foreground"
                className="h-8"
                disabled={isLoading}
              >
                {isLoading ? (
                  <IconLoading
                    className="w-4 h-4 mr-1 shrink-0"
                    colorClassName="bg-background"
                  />
                ) : (
                  <PlayIcon className="w-4 h-4 mr-1 shrink-0" strokeWidth={2} />
                )}
                Run
              </Button>
              <Button variant="foreground-outline" className="h-8">
                <DocumentTextIcon className="w-4 h-4 mr-1 shrink-0" />
                Explain
              </Button>
            </div>
          </div>
          <div className="w-full flex-1 flex flex-col overflow-hidden border-t border-border">
            <DataGridQ
              isLoading={isLoading}
              isError={isError}
              columns={columns}
              rows={rows}
            />
          </div>
        </section>
      </DashboardMainArea>
    </DashboardPageWrapper>
  );
}

async function runQuery(query: string, connectionString: string) {
  await window.electronAPI.openDbConnectionIfNecessary(connectionString);
  const res: string = await window.electronAPI.queryDb({ query });
  if (!res) throw new Error("Failed to get table");
  const resJSON: TTableResult = JSON.parse(res);
  return resJSON;
}
