import DashboardMainArea from "@components/dashboard/DashboardMainArea";
import DashboardPageWrapper from "@components/dashboard/DashboardPageWrapper";
import DashboardSidebar from "@components/dashboard/DashboardSidebar";

export default function QueriesPage() {
  return (
    <DashboardPageWrapper>
      <DashboardSidebar title="Query Editor">
        <section className="w-full flex flex-col"></section>
      </DashboardSidebar>
      <DashboardMainArea>
        <section className="w-full flex flex-col flex-1"></section>
      </DashboardMainArea>
    </DashboardPageWrapper>
  );
}
