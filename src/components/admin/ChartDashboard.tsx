"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import maskotVote from "@/assets/maskots/vote.png";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ArrowUpRightIcon } from "lucide-react";
import type { NomineesResponse } from "@/types/nominee.type";

export default function ChartDashboard({ responseNominee }: { responseNominee: NomineesResponse }) {
  const maxValue = responseNominee.nominees.length;

  return (
    <Card className="">
      <CardHeader className="border-border border-b">
        <CardDescription className="mb-2">
          <Badge>{responseNominee.category.name}</Badge>
        </CardDescription>
        <CardTitle>{responseNominee.nomination.name}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-2">
        {responseNominee.nominees.map((item, i) => {
          const widthPercent = (item.total_votes / maxValue) * 100;
          console.log(widthPercent);

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

                <div className="w-12 text-xs text-muted-foreground text-right font-medium">{item.total_votes}</div>
              </div>

              <div className="flex items-center gap-3 ">
                <div className="w-12" />
                <div className="text-xs text-muted-foreground/80">{item.candidate.name}</div>
              </div>
            </div>
          );
        })}
        <div className="flex justify-end py-0 my-0">
          <Button className="text-xs" variant={"link"}>
            Selengkapnya <ArrowUpRightIcon />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
