"use client"

import { useState } from "react"
import { Sparkles, TrendingUp, Percent, ChevronDown, Package } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

const categoryItems = [
  {
    title: "All Product",
    icon: Package,
    badge: "32",
    hasSubmenu: true,
    subitems: [
      { title: "Electronics", count: 15 },
      { title: "Clothing", count: 8 },
      { title: "Books", count: 9 },
    ],
  },
  {
    title: "New Arrival",
    icon: Sparkles,
    hasSubmenu: true,
    subitems: [
      { title: "This Week", count: 5 },
      { title: "This Month", count: 12 },
    ],
  },
  {
    title: "Best Seller",
    icon: TrendingUp,
    hasSubmenu: true,
    subitems: [
      { title: "Top 10", count: 10 },
      { title: "Most Popular", count: 25 },
    ],
  },
  {
    title: "On Discount",
    icon: Percent,
    hasSubmenu: true,
    subitems: [
      { title: "50% Off", count: 6 },
      { title: "30% Off", count: 12 },
    ],
  },
]

export function CategorySidebar() {
  const [openItems, setOpenItems] = useState<string[]>([])

  const toggleItem = (title: string) => {
    setOpenItems((prev) => (prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]))
  }

  return (
    <div className="w-64 bg-white">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Category</h3>

      <div className="space-y-1">
        {categoryItems.map((item) => (
          <div key={item.title}>
            {item.hasSubmenu ? (
              <Collapsible open={openItems.includes(item.title)} onOpenChange={() => toggleItem(item.title)}>
                <CollapsibleTrigger asChild>
                  <button className="w-full flex items-center justify-between hover:bg-gray-50 py-2.5 px-3 rounded-lg text-left">
                    <div className="flex items-center gap-3">
                      <item.icon className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-700 font-medium">{item.title}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {item.badge && (
                        <Badge className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{item.badge}</Badge>
                      )}
                      <ChevronDown
                        className={`h-4 w-4 text-gray-400 transition-transform ${openItems.includes(item.title) ? "rotate-180" : ""
                          }`}
                      />
                    </div>
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="ml-7 mt-1 space-y-1 border-l">
                    {item.subitems?.map((subitem) => (
                      <button
                        key={subitem.title}
                        className="w-full flex items-center justify-between hover:bg-gray-50 py-2 px-3 rounded-md text-left"
                      >
                        <span className="text-gray-600">{subitem.title}</span>
                        <span className="text-xs text-gray-400">({subitem.count})</span>
                      </button>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ) : (
              <button className="w-full flex items-center gap-3 hover:bg-gray-50 py-2.5 px-3 rounded-lg text-left">
                <item.icon className="h-4 w-4 text-gray-500" />
                <span className="text-gray-700 font-medium">{item.title}</span>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
