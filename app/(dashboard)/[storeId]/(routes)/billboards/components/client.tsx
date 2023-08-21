'use client'

import Headings from "@/components/Headings"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { BillboardColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { ApiList } from "@/components/ui/api-list"


interface BillboardClientProps{
    data: BillboardColumn[]
}

const BillboardClient: React.FC<BillboardClientProps> = ({
    data
}) => {
    const router = useRouter();
    const params = useParams();
  return (
    <>
        <div className="flex items-center justify-between">
            <Headings
                title={`Billboards (${data.length})`}
                description="Manage billboards for your store"
            />
            <Button onClick={() => router.push(`/${params.storeId}/billboards/new`)}>
                <Plus className="mr-2 h-4 w-4" />
                Add New
            </Button>
        </div>
        <Separator/>
        <DataTable 
            columns={columns}
            data={data}
            searchKey="label"
        />
        <Headings 
            title="API"
            description="API calls for Billboards"
        />
        <Separator />
        <ApiList 
            entityName="billboards"
            entityIdName="billboardId"
        />
    </>
  )
}

export default BillboardClient