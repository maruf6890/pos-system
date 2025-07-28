
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  MoreVertical,
  ShieldCheck,
  Trash2,
  Ban,
  Mail,
  Briefcase,
  CreditCard,
  FileText,
  Users,
  Globe,
  Calendar,
  BarChart2,
  ClipboardList,
  DollarSign,
  Check,
  User,
  CircleCheck,
  ArrowUpRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const company = {
  name: "TechNova Ltd.",
  image: "",
  email: "contact@technova.com",
  isVerified: true,
  industry: "Information Technology",
  isBanned: false,
  totalTests: 24,
  credit: 1500,
  employees: 142,
  founded: "2015",
  website: "technova.com",
};

const tests = [
  {
    id: 1,
    title: "AI-Powered Frontend Developer Assessment",
    description:
      "We're looking for a frontend developer with a strong grasp of React.js, keen UI/UX instincts, and a passion for integrating AI-driven features.",
    visibility: "Public",
    participants: 2,
    employees: 1,
    matches: 0,
  },
  {
    id: 2,
    title: "Comprehensive Personality Insight Test",
    description:
      "The Comprehensive Personality Insight Test (CPIT) is designed to provide a detailed analysis of individual personality traits.",
    visibility: "Public",
    participants: 0,
    employees: 0,
    matches: 0,
  },
];

export default function Page() {
  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto space-y-6">
      <Card className="rounded-xl shadow-sm border-0">
        <CardHeader className="p-6 pb-0">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-lg bg-zinc-700 border flex items-center justify-center">
                <div className="text-3xl font-light text-gray-400">TN</div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold">{company.name}</h1>
                  {company.isVerified && (
                    <Badge className="bg-zinc-800 text-green-600 ">
                      <ShieldCheck className="w-4 h-4 mr-1" />
                      Verified
                    </Badge>
                  )}
                  {company.isBanned && (
                    <Badge variant="destructive">Banned</Badge>
                  )}
                </div>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Briefcase className="w-4 h-4" />
                    {company.industry}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Globe className="w-4 h-4" />
                    {company.website}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    Founded {company.founded}
                  </div>
                </div>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-lg h-9 w-9"
                >
                  <MoreVertical className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem className="gap-3">
                  <ShieldCheck className="w-4 h-4" />
                  {company.isVerified ? "Revoke Verification" : "Verify"}
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-3">
                  <Ban className="w-4 h-4" />
                  {company.isBanned ? "Unban Company" : "Ban Company"}
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-3 text-red-600">
                  <Trash2 className="w-4 h-4" />
                  Delete Company
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>

        <CardContent className="p-6 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-1 p-4  rounded-lg border">
              <div className="flex items-center gap-3 text-gray-600">
                <CreditCard className="w-5 h-5" />
                <span className="text-sm font-medium">Company Credit</span>
              </div>
              <p className="text-2xl font-semibold  ">
                ${company.credit.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500">Available balance</p>
            </div>

            <div className="space-y-1 p-4 border  rounded-lg">
              <div className="flex items-center gap-3 text-gray-600">
                <FileText className="w-5 h-5" />
                <span className="text-sm font-medium">Tests Conducted</span>
              </div>
              <p className="text-2xl font-semibold">{company.totalTests}</p>
              <p className="text-xs text-gray-500">Last test 3 days ago</p>
            </div>

            <div className="space-y-1 p-4 border  rounded-lg">
              <div className="flex items-center gap-3 text-gray-600">
                <Users className="w-5 h-5" />
                <span className="text-sm font-medium">Employees</span>
              </div>
              <p className="text-2xl font-semibold">{company.employees}</p>
              <p className="text-xs text-gray-500">Active accounts</p>
            </div>

            <div className="space-y-1 p-4 border rounded-lg">
              <div className="flex items-center gap-3 text-gray-600">
                <Mail className="w-5 h-5" />
                <span className="text-sm font-medium">Contact Email</span>
              </div>
              <p className="text-lg font-medium text-ellipsis overflow-hidden">
                {company.email}
              </p>
              <p className="text-xs text-gray-500">Primary contact</p>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Tests Section with Tabs */}
      <Card className="rounded-xl">
        <CardContent className="p-4">
          <Tabs defaultValue="tests">
            <TabsList className="px-4 h-14 pb-0 border-b rounded-t-xl space-x-2">
              <TabsTrigger value="analytics" className="px-4 py-2 h-auto gap-2">
                <BarChart2 className="w-4 h-4" />
                Analytics
              </TabsTrigger>
              <TabsTrigger value="tests" className="px-4 py-2 h-auto gap-2">
                <ClipboardList className="w-4 h-4" />
                Tests
              </TabsTrigger>
              <TabsTrigger value="credit" className="px-4 py-2 h-auto gap-2">
                <DollarSign className="w-4 h-4" />
                Credit History
              </TabsTrigger>
            </TabsList>

            <TabsContent value="analytics" className="p-6">
              <div className="text-center py-10">
                <p className="text-gray-500">Analytics data will appear here</p>
              </div>
            </TabsContent>

            <TabsContent value="tests" className="p-0">
              <div className="gap-5 p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {tests.map((test) => (
                  <Card
                    key={test.id}
                    className="border border-purple-900 bg-[#291438] shadow-sm  gap-0 p-0"
                  >
                    <CardHeader className=" p-4">
                      <div className="flex justify-between items-start">
                        <h3 className="text-md font-medium text-white/80">
                          {test.title.length > 25
                            ? test.title.slice(0, 25) + "..."
                            : test.title}
                        </h3>
                        <Button variant="outline" size="icon" ><Trash2 /></Button>
                      </div>
                    </CardHeader>
                    <CardContent className=" bg-[#1e1326] p-4 border rounded-2xl ">
                      <p className="text-gray-400 text-sm h-40 overflow-y-auto">
                        {test.description + test.description + test.description}
                      </p>

                      <div className="text-sm mt-5 text-purple-300">
                        <div className="flex items-center gap-2">
                          <CircleCheck className="w-4 h-4" />
                          <span>
                            <span className="font-medium">
                              {test.participants}
                            </span>{" "}
                            participants
                          </span>
                        </div>
                        <div className="flex mt-1 items-center gap-2">
                          <CircleCheck className="w-4 h-4" />
                          <span>
                            <span className="font-medium">
                              {test.employees}
                            </span>{" "}
                            employees
                          </span>
                        </div>
                      </div>

                      <div className="border-t mt-5 pt-4">
                        <div className="flex justify-between items-center gap-2">
                          <Button
                            variant="secondary"
                            size="sm"
                            className="h-7 px-2 text-xs bg-gradient-to-r from-purple-500 via-purple-800 to-purple-950 
               hover:bg-gradient-to-bl hover:from-purple-400 hover:via-purple-800 hover:to-purple-950 
               text-white font-medium transition-colors duration-300 flex items-center gap-1"
                          >
                            Results{" "}
                            <ArrowUpRight
                              strokeWidth="1.5"
                              className="w-3 h-3"
                            />
                          </Button>

                          <div className="flex items-center gap-1 rounded-md border border-purple-600 pr-2 py-1 text-white h-7">
                            <Button
                              variant="secondary"
                         
                              className="h-7  bg-purple-600 rounded-sm hover:bg-purple-600 text-white text-xs font-medium"
                            >
                              1200
                            </Button>
                            <span className="text-xs font-semibold">
                              Matches
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="credit" className="p-6">
              <div className="text-center py-10">
                <p className="text-gray-500">Credit history will appear here</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}