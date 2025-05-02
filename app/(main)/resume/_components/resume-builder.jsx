"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Save, Download, Edit, Monitor, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import MDEditor from "@uiw/react-md-editor";
import html2pdf from "html2pdf.js/dist/html2pdf.min.js";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { saveResume } from "@/actions/resume";
import { EntryForm } from "./entry-form";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/nextjs";
import { entriesToMarkdown } from "@/app/lib/helper";
import { resumeSchema } from "@/app/lib/schema";

export default function ResumeBuilder({ initialContent }) {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState("edit");
  const [resumeMode, setResumeMode] = useState("preview");
  const [previewContent, setPreviewContent] = useState(initialContent);
  const [isGenerating, setIsGenerating] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resumeSchema),
    defaultValues: {
      contactInfo: {},
      summary: "",
      skills: "",
      experience: [],
      education: [],
      projects: [],
    },
  });

  const { loading: isSaving, fn: saveResumeFn, data: saveResult, error: saveError } = useFetch(saveResume);
  const formValues = watch();

  useEffect(() => {
    if (initialContent) setActiveTab("preview");
  }, [initialContent]);

  useEffect(() => {
    if (activeTab === "edit") {
      const newContent = getCombinedContent();
      setPreviewContent(newContent || initialContent);
    }
  }, [formValues, activeTab]);

  useEffect(() => {
    if (saveResult && !isSaving) toast.success("Resume saved successfully!");
    if (saveError) toast.error(saveError.message || "Failed to save resume");
  }, [saveResult, saveError, isSaving]);

  const getContactMarkdown = () => {
    const { contactInfo } = formValues;
    const name = user?.fullName || "Your Name";
    const parts = [];
    if (contactInfo.email) parts.push(`📧 ${contactInfo.email}`);
    if (contactInfo.mobile) parts.push(`📱 ${contactInfo.mobile}`);
    if (contactInfo.linkedin) parts.push(`💼 [LinkedIn](${contactInfo.linkedin})`);
    if (contactInfo.twitter) parts.push(`🐦 [Twitter](${contactInfo.twitter})`);

    return parts.length
      ? `## <div align="center">${name}</div>\n\n<div align="center">\n\n${parts.join(" | ")}\n\n</div>`
      : `## <div align="center">${name}</div>`;
  };

  const getCombinedContent = () => {
    const { summary, skills, experience, education, projects } = formValues;
    return [
      getContactMarkdown(),
      summary && `## Professional Summary\n\n${summary}`,
      skills && `## Skills\n\n${skills}`,
      entriesToMarkdown(experience, "Work Experience"),
      entriesToMarkdown(education, "Education"),
      entriesToMarkdown(projects, "Projects"),
    ]
      .filter(Boolean)
      .join("\n\n");
  };

  const onSubmit = async () => {
    try {
      const formattedContent = previewContent.trim().replace(/\n{2,}/g, "\n\n");
      await saveResumeFn(formattedContent);
    } catch (error) {
      console.error("Save error:", error);
    }
  };

  const generatePDF = async () => {
    setIsGenerating(true);
    try {
      const element = document.getElementById("resume-pdf");
      if (!element) throw new Error("Resume PDF element not found.");

      const options = {
        margin: [15, 15],
        filename: "resume.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };

      await html2pdf().set(options).from(element).save();
    } catch (error) {
      console.error("PDF generation error:", error);
      toast.error("Failed to generate PDF.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div data-color-mode="light" className="space-y-4">
      <div className="flex flex-col md:flex-row justify-between items-center gap-2">
        <h1 className="font-bold gradient-title text-5xl md:text-6xl">Resume Builder</h1>
        <div className="space-x-2">
          <Button variant="destructive" onClick={handleSubmit(onSubmit)} disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" /> Save
              </>
            )}
          </Button>
          <Button onClick={generatePDF} disabled={isGenerating}>
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Generating PDF...
              </>
            ) : (
              <>
                <Download className="h-4 w-4" /> Download PDF
              </>
            )}
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="edit">Form</TabsTrigger>
          <TabsTrigger value="preview">Markdown</TabsTrigger>
        </TabsList>

        <TabsContent value="edit">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <Section title="Contact Information">
              <GridTwo>
                <InputField label="Email" register={register("contactInfo.email")} error={errors.contactInfo?.email} type="email" placeholder="your@email.com" />
                <InputField label="Mobile Number" register={register("contactInfo.mobile")} error={errors.contactInfo?.mobile} type="tel" placeholder="+1 234 567 8900" />
                <InputField label="LinkedIn URL" register={register("contactInfo.linkedin")} error={errors.contactInfo?.linkedin} type="url" placeholder="https://linkedin.com/in/your-profile" />
                <InputField label="Twitter/X Profile" register={register("contactInfo.twitter")} error={errors.contactInfo?.twitter} type="url" placeholder="https://twitter.com/your-handle" />
              </GridTwo>
            </Section>

            <Section title="Professional Summary">
              <Controller
                name="summary"
                control={control}
                render={({ field }) => <Textarea {...field} className="h-32" placeholder="Write a compelling professional summary..." />}
              />
              {errors.summary && <ErrorText>{errors.summary.message}</ErrorText>}
            </Section>

            <Section title="Skills">
              <Controller
                name="skills"
                control={control}
                render={({ field }) => <Textarea {...field} className="h-32" placeholder="List your key skills..." />}
              />
              {errors.skills && <ErrorText>{errors.skills.message}</ErrorText>}
            </Section>

            {["experience", "education", "projects"].map((section) => (
              <Section key={section} title={capitalize(section)}>
                <Controller
                  name={section}
                  control={control}
                  render={({ field }) => <EntryForm type={capitalize(section)} entries={field.value} onChange={field.onChange} />}
                />
                {errors[section] && <ErrorText>{errors[section].message}</ErrorText>}
              </Section>
            ))}
          </form>
        </TabsContent>

        <TabsContent value="preview">
          <Button variant="link" className="mb-2" onClick={() => setResumeMode(resumeMode === "preview" ? "edit" : "preview")}>
            {resumeMode === "preview" ? <><Edit className="h-4 w-4" /> Edit Resume</> : <><Monitor className="h-4 w-4" /> Show Preview</>}
          </Button>

          {resumeMode !== "preview" && <AlertBox message="You will lose edited markdown if you update the form data." />}

          <div className="border rounded-lg">
            <MDEditor value={previewContent} onChange={setPreviewContent} height={800} preview={resumeMode} />
          </div>

          <div className="hidden">
            <div id="resume-pdf">
              <MDEditor.Markdown source={previewContent} style={{ background: "white", color: "black" }} />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// -------------------- Reusable Components --------------------
function Section({ title, children }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">{title}</h3>
      {children}
    </div>
  );
}

function GridTwo({ children }) {
  return <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg bg-muted/50">{children}</div>;
}

function InputField({ label, register, error, ...rest }) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      <Input {...register} {...rest} />
      {error && <ErrorText>{error.message}</ErrorText>}
    </div>
  );
}

function ErrorText({ children }) {
  return <p className="text-sm text-red-500">{children}</p>;
}

function AlertBox({ message }) {
  return (
    <div className="flex p-3 gap-2 items-center border-2 border-yellow-600 text-yellow-600 rounded mb-2">
      <AlertTriangle className="h-5 w-5" />
      <span className="text-sm">{message}</span>
    </div>
  );
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
