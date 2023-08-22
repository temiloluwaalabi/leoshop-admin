import getGraphRevenue from "@/actions/getGraphRevenue"
import getSalesCount from "@/actions/getSalesCount"
import getStockCount from "@/actions/getStockCount"
import getTotalRevenue from "@/actions/getTotalRevenue"
import Headings from "@/components/Headings"
import Overview from "@/components/Overview"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import prismadb from "@/lib/prismadb"
import { formatter } from "@/lib/utils"
import { CreditCard, DollarSign, Package } from "lucide-react"

interface DashboardPageProps {
  params:{
    storeId: string
  }
}
const DashboardPage: React.FC<DashboardPageProps> = async ({
  params
}) => {
  const store = await prismadb.store.findFirst({
    where:{
      id: params.storeId
    }
  })

  const totalRevenue = await getTotalRevenue(params.storeId) ;
  const stockCount = await getStockCount(params.storeId);
  const salesCount = await getSalesCount(params.storeId);
  const graphRevenue = await getGraphRevenue(params.storeId);
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-6">
        <Headings 
          title="Dashboard"
          description="Overview of your store"
        />
        <Separator />
        <div className="md:grid gap-4 md:grid-cols-12 flex flex-col">
          <Card className="lg:col-span-4 md:col-span-6">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatter.format(totalRevenue)}
              </div>
            </CardContent>
          </Card>
          <Card className="lg:col-span-4 md:col-span-6">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Sales
              </CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                +{salesCount}
              </div>
            </CardContent>
          </Card>
          <Card className="lg:col-span-4 md:col-span-12">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Products In Stock
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stockCount}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview data={graphRevenue} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default DashboardPage