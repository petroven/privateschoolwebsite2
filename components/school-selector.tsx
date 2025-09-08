"use client"

import { useSchool } from "@/components/school-provider"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { GraduationCap, ChevronDown, Check } from "lucide-react"

export function SchoolSelector() {
  const { currentSchool, availableSchools, switchSchool } = useSchool()

  // Don't show selector if user only has access to one school
  if (availableSchools.length <= 1) {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center space-x-2 max-w-[200px] bg-transparent">
          <GraduationCap className="h-4 w-4" />
          <span className="truncate">{currentSchool?.name || "Sélectionner une école"}</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[250px]">
        {availableSchools.map((school) => (
          <DropdownMenuItem
            key={school.id}
            onClick={() => switchSchool(school.id)}
            className="flex items-center justify-between"
          >
            <div className="flex flex-col">
              <span className="font-medium">{school.name}</span>
              {school.address && <span className="text-xs text-muted-foreground truncate">{school.address}</span>}
            </div>
            {currentSchool?.id === school.id && <Check className="h-4 w-4 text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
