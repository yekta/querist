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
        <QueryEditor />
      </DashboardMainArea>
    </DashboardPageWrapper>
  );
}
