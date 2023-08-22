import React, { useState } from "react";
import { UserButton, auth } from "@clerk/nextjs"
import { MainNav } from "@/components/main-nav"
import StoreSwitcher from "@/components/store.switcher"
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";
import { ModeToggle } from "@/components/theme-toggle";
import { Menu } from "lucide-react";

const Navbar = async () => {
    const {userId} = auth();

    if(!userId){
        redirect("/sign-in")
    }

    const stores = await prismadb.store.findMany({
        where:{
            userId
        }
    })

  return (
    <div className="border-b">
        <div className="flex h-16 items-center px-4">
            <StoreSwitcher items={stores} />
            <div className="lg:flex hidden">
                <MainNav className="mx-6" />
            </div>
            {/* <div className="lg:hidden flex">
                <MainNav className="mx-6" />
            </div> */}
            <div className="ml-auto flex items-center space-x-4">
                <UserButton afterSignOutUrl="/" />
                <ModeToggle />
                <Menu size={25} className="lg:hidden flex" />
            </div>
        </div>
    </div>
  )
}

export default Navbar