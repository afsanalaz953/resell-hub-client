
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import {Bars, Bell, Envelope, Gear, House, Magnifier, Person} from "@gravity-ui/icons";
import {Button, Drawer} from "@heroui/react";
// import { role } from "better-auth/plugins";
import Link from "next/link";


export default async function DashboardSidebar() {
const session = await auth.api.getSession({
  headers: await headers()
})
const user = session?.user 
const role = user?.role || 'buyer'
// console.log(role, "role")
// console.log(user, "user")

const dashboardItems={
 seller: [
  {icon: House, label: "Overview", link:'/dashboard/seller'},
    {icon: Magnifier, label: "Add Products", link:'/dashboard/seller/addproducts'},
    {icon: Bell, label: "My Products", link: '/dashboard/seller/myproducts'},
    {icon: Envelope, label: "Manage Orders", link:'/dashboard/seller/orders'},
    {icon: Person, label: "Analytics", link: '/dashboard/seller/analytics'},
    // {icon: Gear, label: "Settings"},

 ],
buyer: [
  {icon: House, label: "Overview", link:'/dashboard/buyer'},
    {icon: Magnifier, label: "My Orders", link:'/dashboard/buyer/myorders'},
    {icon: Bell, label: "Wishlist",link:'/dashboard/buyer/wishlist' },
    {icon: Envelope, label: "Payments", link:'/dashboard/buyer/payment'},
    {icon: Person, label: "Profile",link:'/dashboard/buyer/profile' },
    // {icon: Gear, label: "Settings"},

 ],
 admin:[
  {icon: House, label: "Overview", link:'/dashboard/admin'},
    {icon: Magnifier, label: "Manage User", link:'/dashboard/admin/manageuser'},
    {icon: Bell, label: "Manage Products", link:'/dashboard/admin/,manageproducts'},
    {icon: Envelope, label: "All Orders", link:'/dashboard/admin/allorders'},
    {icon: Person, label: "Analytics", link:'/dashboard/admin/analytics'},
    // {icon: Gear, label: "Settings"},

 ],

};

 


const navItems = dashboardItems[role]
console.log(navItems, "navitems")



  // const navItems = [
  //   {icon: House, label: "Home"},
  //   {icon: Magnifier, label: "Search"},
  //   {icon: Bell, label: "Notifications"},
  //   {icon: Envelope, label: "Messages"},
  //   {icon: Person, label: "Profile"},
  //   {icon: Gear, label: "Settings"},
  // ];

  return (
    
    <Drawer>
       
      <Button  className= {'hidden'} variant="secondary">
        <Bars />
        Menu
      </Button>
      <div className="font-bold text-orange-500 text-2xl border-b mt-0 pt-0 ">
         ReSell Hub 
        </div>
      <nav className="flex flex-col gap-1 mt-10">
       
                {navItems.map((item) => (
                  <Link key={item.label} href={item.link} > 
                  <button
                   
                    
                    className="flex items-center gap-3 rounded-xl px-6 py-2.5 text-sm text-white transition-colors hover:bg-[#FF6900]"
                    type="button"
                  >
                    <item.icon className="size-5 text-muted" />
                    {item.label}
                  </button>
                    </Link>
                ))}
              </nav>
      <Drawer.Backdrop>
        <Drawer.Content placement="left">
          <Drawer.Dialog>
            <Drawer.CloseTrigger />
            <Drawer.Header>
              <Drawer.Heading>Navigation</Drawer.Heading>
            </Drawer.Header>
            <Drawer.Body>
              
            </Drawer.Body>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  );
}