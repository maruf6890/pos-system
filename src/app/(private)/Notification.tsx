"use client";

import * as React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type Notification = {
  id: number;
  title: string;
  description: string;
  time: string;
  icon?: React.ReactNode;
  highlight?: boolean;
};

const mockData: Notification[] = Array.from({ length: 15 }, (_, i) => ({
  id: i,
  title: `Notification ${i + 1}`,
  description: `This is the detail of notification ${i + 1}.`,
  time: `${i + 1}h ago`,
  highlight: i === 1, // highlight one as example
}));

export function Notification() {
  const [loading, setLoading] = React.useState(false);
  const [visibleCount, setVisibleCount] = React.useState(5);
  const [notifications, setNotifications] = React.useState<Notification[]>(
    mockData.slice(0, 5)
  );

  const handleLoadMore = async () => {
    setLoading(true);
    setTimeout(() => {
      const next = mockData.slice(0, visibleCount + 5);
      setNotifications(next);
      setVisibleCount(next.length);
      setLoading(false);
    }, 1000); 
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="secondary"
          size="icon"
          className="rounded-full border   relative cursor-pointer"
        >
          <Bell className="h-5 w-5" />

          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-96 p-2 bg-popover border border-border rounded-xl "
        side="bottom"
        align="end"
      >
        <div className="flex justify-between items-center px-2 pb-2">
          <h4 className="font-semibold text-sm">Notifications</h4>
          <Button
            variant="link"
            size="sm"
            className="text-xs text-muted-foreground p-0 h-auto"
          >
            Mark all as read
          </Button>
        </div>

        <div className="max-h-64 overflow-y-auto space-y-2 pr-1">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={cn(
                "rounded-md p-3 bg-muted/20 border border-border",
                n.highlight && "bg-purple-900/20"
              )}
            >
              <h5 className="text-sm font-medium">{n.title}</h5>
              <p className="text-xs text-muted-foreground">{n.description}</p>
              <p className="text-[10px] text-right text-muted-foreground">
                {n.time}
              </p>
            </div>
          ))}

          {loading && (
            <>
              {[...Array(2)].map((_, i) => (
                <div key={i} className="space-y-1 p-3 rounded-md bg-muted/20">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-2/3" />
                  <Skeleton className="h-2 w-1/4 ml-auto" />
                </div>
              ))}
            </>
          )}
        </div>

        {visibleCount < mockData.length && (
          <div className="pt-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full border-purple-900"
              onClick={handleLoadMore}
              disabled={loading}
            >
              {loading ? "Loading..." : "Load more"}
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
