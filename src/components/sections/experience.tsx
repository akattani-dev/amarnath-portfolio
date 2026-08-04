import { SectionHeading } from "@/components/section-heading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { education, experience } from "@/content/site";

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-20">
      <SectionHeading index="03" label="Experience" title="Where I have worked" />

      <Tabs defaultValue="roles" className="mt-8 gap-5">
        <TabsList variant="line" className="h-8 border-b border-border">
          <TabsTrigger value="roles" className="px-3">
            Roles
          </TabsTrigger>
          <TabsTrigger value="education" className="px-3">
            Education
          </TabsTrigger>
        </TabsList>

        <TabsContent value="roles">
          <ol>
            {experience.map((role) => (
              <li key={role.company} className="border-b border-border">
                <div className="grid gap-1 py-4 sm:grid-cols-[minmax(0,13rem)_minmax(0,1fr)] sm:items-baseline sm:gap-10">
                  <p className="text-sm tracking-[0.06em] text-muted-foreground">
                    {role.period}
                  </p>
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                    <h3 className="font-display text-lg tracking-tight text-foreground">
                      {role.company}
                    </h3>
                    <p className="text-sm text-brand">{role.title}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </TabsContent>

        <TabsContent value="education">
          <ol>
            {education.map((entry) => (
              <li key={entry.credential} className="border-b border-border">
                <div className="grid gap-1 py-4 sm:grid-cols-[minmax(0,13rem)_minmax(0,1fr)] sm:items-baseline sm:gap-10">
                  <p className="text-sm tracking-[0.06em] text-muted-foreground">
                    {entry.period ?? "—"}
                  </p>
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                    <h3 className="font-display text-lg tracking-tight text-foreground">
                      {entry.credential}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {entry.institution}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </TabsContent>
      </Tabs>
    </section>
  );
}
