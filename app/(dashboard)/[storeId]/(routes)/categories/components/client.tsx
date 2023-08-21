'use client'

import Headings from "@/components/Headings"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { CategoryColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { ApiList } from "@/components/ui/api-list"


interface CategoryClientProps{
    data: CategoryColumn[]
}

const CategoryClient: React.FC<CategoryClientProps> = ({
    data
}) => {
    const router = useRouter();
    const params = useParams();
  return (
    <>
        <div className="flex items-center justify-between">
            <Headings
                title={`Categories (${data.length})`}
                description="Manage Categories for your store"
            />
            <Button onClick={() => router.push(`/${params.storeId}/categories/new`)}>
                <Plus className="mr-2 h-4 w-4" />
                Add New
            </Button>
        </div>
        <Separator/>
        <DataTable 
            columns={columns}
            data={data}
            searchKey="name"
        />
        <Headings 
            title="API"
            description="API calls for Categories"
        />
        <Separator />
        <ApiList 
            entityName="Categories"
            entityIdName="CategoryId"
        />
    </>
  )
}

export default CategoryClient