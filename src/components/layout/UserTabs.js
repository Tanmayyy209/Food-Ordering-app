"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function UserTabs({isAdmin}){
  const path = usePathname();
  return(
      <div className="flex mx-auto gap-2 tabs justify-center" >
          <Link 
          className={path === '/profile' ? 'active' : '' }
          href={'/profile'}
          >
              Profile
          </Link>
          {isAdmin &&(
               <>
               <Link
                href ={'/categories'}
                className={path === '/categories' ? 'active' : '' }
                >
                  Categories
                  </Link>
               <Link 
               href ={'/menu-items'}
               className={path === '/menu-items' ? 'active' : '' }
               >
                  Menu Itmes</Link>
               <Link 
               href ={'/users'}
               className={path === '/users' ? 'active' : '' }
               >
                  Users</Link>
                  <Link 
               href ={'/orders'}
               className={path === '/orders' ? 'active' : '' }
               >
                  Orders</Link>
               </>
          )}
        
      </div>
  )
}