import DashboardMainArea from "@components/dashboard/DashboardMainArea";
import DashboardPageWrapper from "@components/dashboard/DashboardPageWrapper";
import DashboardSidebar from "@components/dashboard/DashboardSidebar";
import QueryEditor from "@components/queryEditor/QueryEditor";

export default function QueriesPage() {
  return (
    <DashboardPageWrapper>
      <DashboardSidebar title="Query Editor">
        <></>
      </DashboardSidebar>
      <DashboardMainArea>
        <section className="w-full flex-1">
          <QueryEditor />
        </section>
        <section className="w-full flex-1 px-3 py-2 border-t border-border">
          Results
        </section>
      </DashboardMainArea>
    </DashboardPageWrapper>
  );
}
