import DashboardMainArea from "@components/dashboard/DashboardMainArea";
import DashboardPageWrapper from "@components/dashboard/DashboardPageWrapper";
import DashboardSidebar from "@components/dashboard/DashboardSidebar";
import { Button } from "@components/primitives/ui/button";
import QueryEditor from "@components/queryEditor/QueryEditor";
import { useMonaco } from "@monaco-editor/react";
import { connectionString } from "@ts/db/connectionString";
import { TTableResult } from "@ts/db/hooks/useTable";
import {
  getGridColsFromTableResult,
  getGridRowsFromTableResult,
} from "@components/dataGrid/helpers";
import { useState } from "react";
import { Column } from "react-data-grid";
import { DataGridQ, TRow } from "@components/dataGrid/DataGridQ";

export default function QueriesPage() {
  const monaco = useMonaco();
  const [columns, setColumns] = useState<Column<TRow, any>[]>([]);
  const [rows, setRows] = useState<any[]>([]);
  const [resultLength, setResultLength] = useState<number | undefined>(
    undefined
  );

  async function handleRunClick() {
    console.log("run");
    const query = monaco.editor.getEditors()[0].getValue();
    try {
      const res = await runQuery(query, connectionString);
      const cols = getGridColsFromTableResult({ data: res, hasSelect: false });
      const rows = getGridRowsFromTableResult({ data: res });
      setColumns(cols);
      setRows(rows);
      setResultLength(res.rows.length);
      console.log(res);
    } catch (error) {
      console.log(error);
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
            <p className="w-[10rem] max-w-full text-lg font-bold px-2.5">
              Results
              {resultLength !== undefined && (
                <span className="text-foreground/60 font-normal text-sm px-1">
                  ({resultLength})
                </span>
              )}
            </p>
            <div className="flex items-center justify-start gap-2">
              <Button
                onClick={handleRunClick}
                variant="foreground"
                className="h-8"
              >
                Run
              </Button>
              <Button variant="foreground-outline" className="h-8">
                Explain
              </Button>
            </div>
          </div>
          <div className="w-full flex-1 flex flex-col overflow-hidden border-t border-border">
            <DataGridQ isLoading={false} columns={columns} rows={rows} />
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
