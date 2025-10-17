"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import maskotVote from "@/assets/maskots/vote.png";
import { Badge } from "../ui/badge";

const chartData = [
  { label: "Profile A", name: "John Doe", value: 275 },
  { label: "Profile B", name: "Jane Smith", value: 200 },
  { label: "Profile C", name: "Michael Tan", value: 187 },
  { label: "Profile D", name: "Siti Rahma", value: 173 },
  { label: "Profile E", name: "Rudi Hartono", value: 90 },
];

export default function ChartDashboard() {
  const maxValue = Math.max(...chartData.map((d) => d.value));

  return (
    <Card className="">
      <CardHeader>
        <CardDescription className="mb-2">
          <Badge>Dosen</Badge>
        </CardDescription>
        <CardTitle>Best Inovative Teacher</CardTitle>
      </CardHeader>

      <CardContent className="space-y-2">
        {chartData.map((item, i) => {
          const widthPercent = (item.value / maxValue) * 100;

          return (
            <div key={i} className="flex flex-col">
              <div className="flex items-center gap-3">
                <div className="w-12 text-sm font-medium text-muted-foreground">
                  <img src={maskotVote} className="w-12 h-12 rounded-full " />
                </div>

                <div className="relative flex-1 h-7 rounded-xl bg-muted overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${widthPercent}%` }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="absolute left-0 top-0 h-full bg-primary rounded-xl"
                  />
                </div>

                <div className="w-12 text-xs text-muted-foreground text-right font-medium">{item.value}</div>
              </div>

              <div className="flex items-center gap-3 ">
                <div className="w-12" />
                <div className="text-xs text-muted-foreground/80">{item.name}</div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
