"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShieldAlert,
  User,
  GraduationCap,
  Briefcase,
  FolderGit2,
  Image as ImageIcon,
  Cpu,
  Mail,
  Plus,
  Trash2,
  Edit3,
  Save,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ArrowLeft,
  Loader2,
  Sparkles,
  Layers,
  Globe,
  Eye,
  EyeOff
} from "lucide-react";
import TechIcon from "@/components/TechIcon";
import SocialIcon from "@/components/SocialIcon";
import { getSafeImageUrl } from "@/lib/imageUtils";

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<
    "profile" | "about" | "education" | "experience" | "projects" | "gallery" | "skills" | "messages"
  >("profile");

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // DATA STATES
  const [profile, setProfile] = useState<any>({
    name: "",
    title: "",
    roles: [],
    bio: "",
    location: "",
    email: "",
    phone: "",
    resumeUrl: "",
    avatarUrl: "",
    aboutTitle: "",
    aboutDescription: "",
    aboutImage: "",
    githubUrl: "",
    linkedinUrl: "",
    availableForHire: true,
    socialLinks: [],
  });

  const [aboutList, setAboutList] = useState<any[]>([]);
  const [educationList, setEducationList] = useState<any[]>([]);
  const [experienceList, setExperienceList] = useState<any[]>([]);
  const [projectsList, setProjectsList] = useState<any[]>([]);
  const [galleryList, setGalleryList] = useState<any[]>([]);
  const [skillsList, setSkillsList] = useState<any[]>([]);
  const [messagesList, setMessagesList] = useState<any[]>([]);

  // FORM MODAL & EDIT STATES
  const [editingAboutId, setEditingAboutId] = useState<string | null>(null);
  const [aboutForm, setAboutForm] = useState({
    title: "",
    image: "",
    description: "",
    name: "",
    location: "",
    email: "",
    phone: "",
    showDetails: false,
    order: 0,
  });
  const [editingSocialIndex, setEditingSocialIndex] = useState<number | null>(null);
  const [newSocial, setNewSocial] = useState({
    platform: "",
    url: "",
    iconName: "Globe",
    showInHero: true,
    showInContact: true,
  });

  const [editingEduId, setEditingEduId] = useState<string | null>(null);
  const [eduForm, setEduForm] = useState({
    degree: "",
    university: "",
    timeBound: "",
    cgpa: "",
    description: "",
    coursework: "",
    highlights: "",
    location: "",
  });

  const [editingExpId, setEditingExpId] = useState<string | null>(null);
  const [expForm, setExpForm] = useState<{
    company: string;
    role: string;
    timeBound: string;
    description: string;
    responsibilities: string[];
    technologies: string;
    location: string;
  }>({
    company: "",
    role: "",
    timeBound: "",
    description: "",
    responsibilities: [""],
    technologies: "",
    location: "",
  });

  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [projectForm, setProjectForm] = useState({
    title: "",
    image: "",
    images: "",
    shortDescription: "",
    fullDescription: "",
    features: "",
    icons: "",
    frontendTech: "",
    backendTech: "",
    liveUrl: "",
    githubUrl: "",
    githubFrontend: "",
    githubBackend: "",
    featured: true,
  });

  const [editingGalleryId, setEditingGalleryId] = useState<string | null>(null);
  const [galleryForm, setGalleryForm] = useState({
    title: "",
    imageUrl: "",
    caption: "",
    category: "Featured",
  });

  const [editingSkillId, setEditingSkillId] = useState<string | null>(null);
  const [skillForm, setSkillForm] = useState({
    name: "",
    category: "frontend",
    borderColor: "#38bdf8",
    textColor: "#38bdf8",
    iconPath: "/icons/text.png",
  });

  // LOAD ALL DATA
  const fetchAllData = async () => {
    try {
      setLoading(true);
      const [pRes, aRes, eRes, expRes, prRes, gRes, sRes, mRes] = await Promise.all([
        fetch("/api/profile").then((r) => r.json()),
        fetch("/api/about").then((r) => r.json()),
        fetch("/api/education").then((r) => r.json()),
        fetch("/api/experience").then((r) => r.json()),
        fetch("/api/projects").then((r) => r.json()),
        fetch("/api/gallery").then((r) => r.json()),
        fetch("/api/skills").then((r) => r.json()),
        fetch("/api/contact").then((r) => r.json()),
      ]);

      if (pRes && !pRes.error) setProfile(pRes);
      if (Array.isArray(aRes)) setAboutList(aRes);
      if (Array.isArray(eRes)) setEducationList(eRes);
      if (Array.isArray(expRes)) setExperienceList(expRes);
      if (Array.isArray(prRes)) setProjectsList(prRes);
      if (Array.isArray(gRes)) setGalleryList(gRes);
      if (Array.isArray(sRes)) setSkillsList(sRes);
      if (Array.isArray(mRes)) setMessagesList(mRes);
    } catch (err) {
      console.error("Error loading dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // SHOW STATUS HELPER
  const notify = (type: "success" | "error", message: string) => {
    setStatus({ type, message });
    setTimeout(() => setStatus(null), 4000);
  };

  // ONE-CLICK SEED DATABASE
  const handleSeedDatabase = async () => {
    if (!confirm("Are you sure you want to reset & populate default database data?")) return;
    try {
      setLoading(true);
      const res = await fetch("/api/seed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ force: true }),
      });
      const data = await res.json();
      if (res.ok) {
        notify("success", "Database seeded with initial high-quality records!");
        fetchAllData();
      } else {
        notify("error", data.error || "Seed failed");
      }
    } catch (err: any) {
      notify("error", err.message);
    } finally {
      setLoading(false);
    }
  };

  // SAVE PROFILE
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });
      if (res.ok) {
        notify("success", "Profile updated successfully!");
      } else {
        notify("error", "Failed to update profile");
      }
    } catch (err: any) {
      notify("error", err.message);
    } finally {
      setLoading(false);
    }
  };

  // ADD / UPDATE SOCIAL LINK
  const handleAddSocial = () => {
    if (!newSocial.platform || !newSocial.url) return;
    if (editingSocialIndex !== null) {
      const updated = [...(profile.socialLinks || [])];
      updated[editingSocialIndex] = newSocial;
      setProfile({ ...profile, socialLinks: updated });
      setEditingSocialIndex(null);
    } else {
      setProfile({
        ...profile,
        socialLinks: [...(profile.socialLinks || []), newSocial],
      });
    }
    setNewSocial({ platform: "", url: "", iconName: "Globe", showInHero: true, showInContact: true });
  };

  const handleEditSocial = (index: number) => {
    setEditingSocialIndex(index);
    const s = profile.socialLinks[index];
    setNewSocial({
      platform: s.platform || "",
      url: s.url || "",
      iconName: s.iconName || "Globe",
      showInHero: s.showInHero !== false,
      showInContact: s.showInContact !== false,
    });
  };

  const handleCancelEditSocial = () => {
    setEditingSocialIndex(null);
    setNewSocial({ platform: "", url: "", iconName: "Globe", showInHero: true, showInContact: true });
  };

  // TOGGLE SOCIAL VISIBILITY
  const handleToggleSocialHero = (index: number) => {
    const updated = [...(profile.socialLinks || [])];
    const s = updated[index];
    updated[index] = {
      ...s,
      showInHero: s.showInHero === false ? true : false,
    };
    setProfile({ ...profile, socialLinks: updated });
  };

  const handleToggleSocialContact = (index: number) => {
    const updated = [...(profile.socialLinks || [])];
    const s = updated[index];
    updated[index] = {
      ...s,
      showInContact: s.showInContact === false ? true : false,
    };
    setProfile({ ...profile, socialLinks: updated });
  };

  // REMOVE SOCIAL LINK
  const handleRemoveSocial = (index: number) => {
    const updated = [...profile.socialLinks];
    updated.splice(index, 1);
    setProfile({ ...profile, socialLinks: updated });
    if (editingSocialIndex === index) {
      handleCancelEditSocial();
    }
  };

  // ADD / UPDATE ABOUT SECTION
  const handleAddAbout = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const url = editingAboutId ? `/api/about/${editingAboutId}` : "/api/about";
      const method = editingAboutId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(aboutForm),
      });
      if (res.ok) {
        notify("success", editingAboutId ? "About section updated successfully!" : "About section added!");
        handleCancelEditAbout();
        fetchAllData();
      } else {
        const data = await res.json();
        notify("error", data.error || "Failed to save about section");
      }
    } catch (err: any) {
      notify("error", err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditAbout = (item: any) => {
    setEditingAboutId(item._id);
    setAboutForm({
      title: item.title || "",
      image: item.image || "",
      description: item.description || "",
      name: item.name || "",
      location: item.location || "",
      email: item.email || "",
      phone: item.phone || "",
      showDetails: Boolean(item.showDetails),
      order: item.order ?? 0,
    });
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  const handleCancelEditAbout = () => {
    setEditingAboutId(null);
    setAboutForm({
      title: "",
      image: "",
      description: "",
      name: "",
      location: "",
      email: "",
      phone: "",
      showDetails: false,
      order: 0,
    });
  };

  // DELETE ABOUT SECTION
  const handleDeleteAbout = async (id: string) => {
    if (!confirm("Delete this about section?")) return;
    try {
      await fetch(`/api/about/${id}`, { method: "DELETE" });
      notify("success", "About section deleted");
      if (editingAboutId === id) handleCancelEditAbout();
      fetchAllData();
    } catch (err: any) {
      notify("error", err.message);
    }
  };

  // ADD / UPDATE EDUCATION
  const handleAddEducation = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const payload = {
        ...eduForm,
        coursework: eduForm.coursework ? eduForm.coursework.split(",").map((s) => s.trim()).filter(Boolean) : [],
        highlights: eduForm.highlights ? eduForm.highlights.split(",").map((s) => s.trim()).filter(Boolean) : [],
      };
      const url = editingEduId ? `/api/education/${editingEduId}` : "/api/education";
      const method = editingEduId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        notify("success", editingEduId ? "Education record updated successfully!" : "Education added!");
        handleCancelEditEducation();
        fetchAllData();
      } else {
        const data = await res.json();
        notify("error", data.error || "Failed to save education");
      }
    } catch (err: any) {
      notify("error", err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditEducation = (edu: any) => {
    setEditingEduId(edu._id);
    setEduForm({
      degree: edu.degree || "",
      university: edu.university || "",
      timeBound: edu.timeBound || "",
      cgpa: edu.cgpa || "",
      location: edu.location || "",
      coursework: Array.isArray(edu.coursework) ? edu.coursework.join(", ") : (edu.coursework || ""),
      highlights: Array.isArray(edu.highlights) ? edu.highlights.join(", ") : (edu.highlights || ""),
      description: edu.description || "",
    });
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  const handleCancelEditEducation = () => {
    setEditingEduId(null);
    setEduForm({
      degree: "",
      university: "",
      timeBound: "",
      cgpa: "",
      description: "",
      coursework: "",
      highlights: "",
      location: "",
    });
  };

  // DELETE EDUCATION
  const handleDeleteEducation = async (id: string) => {
    if (!confirm("Delete this education entry?")) return;
    try {
      await fetch(`/api/education/${id}`, { method: "DELETE" });
      notify("success", "Education deleted");
      if (editingEduId === id) handleCancelEditEducation();
      fetchAllData();
    } catch (err: any) {
      notify("error", err.message);
    }
  };

  // EXPERIENCE RESPONSIBILITY FIELD HELPERS
  const handleAddResponsibilityField = () => {
    setExpForm((prev) => ({
      ...prev,
      responsibilities: [...prev.responsibilities, ""],
    }));
  };

  const handleUpdateResponsibilityField = (index: number, value: string) => {
    setExpForm((prev) => {
      const updated = [...prev.responsibilities];
      updated[index] = value;
      return { ...prev, responsibilities: updated };
    });
  };

  const handleRemoveResponsibilityField = (index: number) => {
    setExpForm((prev) => {
      const updated = prev.responsibilities.filter((_, i) => i !== index);
      return {
        ...prev,
        responsibilities: updated.length > 0 ? updated : [""],
      };
    });
  };

  // ADD / UPDATE EXPERIENCE
  const handleAddExperience = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const cleanedResponsibilities = expForm.responsibilities
        .map((s) => s.trim())
        .filter(Boolean);

      const payload = {
        ...expForm,
        responsibilities: cleanedResponsibilities,
        technologies: expForm.technologies ? expForm.technologies.split(",").map((s) => s.trim()).filter(Boolean) : [],
      };
      const url = editingExpId ? `/api/experience/${editingExpId}` : "/api/experience";
      const method = editingExpId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        notify("success", editingExpId ? "Experience entry updated successfully!" : "Experience added!");
        handleCancelEditExperience();
        fetchAllData();
      } else {
        const data = await res.json();
        notify("error", data.error || "Failed to save experience");
      }
    } catch (err: any) {
      notify("error", err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditExperience = (exp: any) => {
    setEditingExpId(exp._id);
    let initialResponsibilities = [""];
    if (Array.isArray(exp.responsibilities) && exp.responsibilities.length > 0) {
      initialResponsibilities = exp.responsibilities;
    } else if (typeof exp.responsibilities === "string" && exp.responsibilities.trim()) {
      initialResponsibilities = exp.responsibilities.split(",").map((s: string) => s.trim()).filter(Boolean);
    }
    setExpForm({
      company: exp.company || "",
      role: exp.role || "",
      timeBound: exp.timeBound || "",
      location: exp.location || "",
      technologies: Array.isArray(exp.technologies) ? exp.technologies.join(", ") : (exp.technologies || ""),
      responsibilities: initialResponsibilities.length > 0 ? initialResponsibilities : [""],
      description: exp.description || "",
    });
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  const handleCancelEditExperience = () => {
    setEditingExpId(null);
    setExpForm({
      company: "",
      role: "",
      timeBound: "",
      description: "",
      responsibilities: [""],
      technologies: "",
      location: "",
    });
  };

  // DELETE EXPERIENCE
  const handleDeleteExperience = async (id: string) => {
    if (!confirm("Delete this experience entry?")) return;
    try {
      await fetch(`/api/experience/${id}`, { method: "DELETE" });
      notify("success", "Experience deleted");
      if (editingExpId === id) handleCancelEditExperience();
      fetchAllData();
    } catch (err: any) {
      notify("error", err.message);
    }
  };

  // ADD / UPDATE PROJECT
  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const payload = {
        ...projectForm,
        images: projectForm.images
          ? projectForm.images.split(/[\n,]/).map((s) => s.trim()).filter(Boolean)
          : [],
        features: projectForm.features
          ? projectForm.features.split("\n").map((s) => s.trim()).filter(Boolean)
          : [],
        icons: projectForm.icons
          ? projectForm.icons.split(",").map((s) => s.trim()).filter(Boolean)
          : [],
        frontendTech: projectForm.frontendTech
          ? projectForm.frontendTech.split(",").map((s) => s.trim()).filter(Boolean)
          : [],
        backendTech: projectForm.backendTech
          ? projectForm.backendTech.split(",").map((s) => s.trim()).filter(Boolean)
          : [],
      };
      const url = editingProjectId ? `/api/projects/${editingProjectId}` : "/api/projects";
      const method = editingProjectId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        notify("success", editingProjectId ? "Project updated successfully!" : "Project added!");
        handleCancelEditProject();
        fetchAllData();
      } else {
        const data = await res.json();
        notify("error", data.error || "Failed to save project");
      }
    } catch (err: any) {
      notify("error", err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditProject = (proj: any) => {
    setEditingProjectId(proj._id);
    setProjectForm({
      title: proj.title || "",
      image: proj.image || "",
      images: Array.isArray(proj.images) ? proj.images.join("\n") : (proj.images || ""),
      shortDescription: proj.shortDescription || "",
      fullDescription: proj.fullDescription || "",
      features: Array.isArray(proj.features) ? proj.features.join("\n") : "",
      icons: Array.isArray(proj.icons) ? proj.icons.join(", ") : "",
      frontendTech: Array.isArray(proj.frontendTech) ? proj.frontendTech.join(", ") : "",
      backendTech: Array.isArray(proj.backendTech) ? proj.backendTech.join(", ") : "",
      liveUrl: proj.liveUrl || "",
      githubUrl: proj.githubUrl || "",
      githubFrontend: proj.githubFrontend || "",
      githubBackend: proj.githubBackend || "",
      featured: proj.featured ?? true,
    });
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  const handleCancelEditProject = () => {
    setEditingProjectId(null);
    setProjectForm({
      title: "",
      image: "",
      images: "",
      shortDescription: "",
      fullDescription: "",
      features: "",
      icons: "",
      frontendTech: "",
      backendTech: "",
      liveUrl: "",
      githubUrl: "",
      githubFrontend: "",
      githubBackend: "",
      featured: true,
    });
  };

  // DELETE PROJECT
  const handleDeleteProject = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    try {
      await fetch(`/api/projects/${id}`, { method: "DELETE" });
      notify("success", "Project deleted");
      if (editingProjectId === id) handleCancelEditProject();
      fetchAllData();
    } catch (err: any) {
      notify("error", err.message);
    }
  };

  // TOGGLE PROJECT FEATURED STATUS (1-CLICK VISIBILITY)
  const handleToggleProjectFeatured = async (proj: any) => {
    try {
      setLoading(true);
      const newFeatured = proj.featured === false ? true : false;
      const res = await fetch(`/api/projects/${proj._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ featured: newFeatured }),
      });
      if (res.ok) {
        notify("success", newFeatured ? `"${proj.title}" is now visible on Home Page!` : `"${proj.title}" hidden from Home Page!`);
        fetchAllData();
      } else {
        notify("error", "Failed to update visibility");
      }
    } catch (err: any) {
      notify("error", err.message);
    } finally {
      setLoading(false);
    }
  };

  // ADD / UPDATE GALLERY IMAGE
  const handleAddGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const url = editingGalleryId ? `/api/gallery/${editingGalleryId}` : "/api/gallery";
      const method = editingGalleryId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(galleryForm),
      });
      if (res.ok) {
        notify("success", editingGalleryId ? "Gallery slide updated successfully!" : "Gallery image added!");
        handleCancelEditGallery();
        fetchAllData();
      } else {
        const data = await res.json();
        notify("error", data.error || "Failed to save gallery slide");
      }
    } catch (err: any) {
      notify("error", err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditGallery = (item: any) => {
    setEditingGalleryId(item._id);
    setGalleryForm({
      title: item.title || "",
      imageUrl: item.imageUrl || "",
      caption: item.caption || "",
      category: item.category || "Featured",
    });
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  const handleCancelEditGallery = () => {
    setEditingGalleryId(null);
    setGalleryForm({ title: "", imageUrl: "", caption: "", category: "Featured" });
  };

  // DELETE GALLERY IMAGE
  const handleDeleteGallery = async (id: string) => {
    if (!confirm("Delete this gallery image?")) return;
    try {
      await fetch(`/api/gallery/${id}`, { method: "DELETE" });
      notify("success", "Gallery image deleted");
      if (editingGalleryId === id) handleCancelEditGallery();
      fetchAllData();
    } catch (err: any) {
      notify("error", err.message);
    }
  };

  // ADD / UPDATE SKILL
  const handleAddSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const url = editingSkillId ? `/api/skills/${editingSkillId}` : "/api/skills";
      const method = editingSkillId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(skillForm),
      });
      if (res.ok) {
        notify("success", editingSkillId ? "Skill updated successfully!" : "Skill added!");
        handleCancelEditSkill();
        fetchAllData();
      } else {
        const data = await res.json();
        notify("error", data.error || "Failed to save skill");
      }
    } catch (err: any) {
      notify("error", err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditSkill = (skill: any) => {
    setEditingSkillId(skill._id);
    setSkillForm({
      name: skill.name || "",
      category: skill.category || "frontend",
      borderColor: skill.borderColor || "#38bdf8",
      textColor: skill.textColor || "#38bdf8",
      iconPath: skill.iconPath || "/icons/text.png",
    });
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  const handleCancelEditSkill = () => {
    setEditingSkillId(null);
    setSkillForm({ name: "", category: "frontend", borderColor: "#38bdf8", textColor: "#38bdf8", iconPath: "/icons/text.png" });
  };

  // DELETE SKILL
  const handleDeleteSkill = async (id: string) => {
    if (!confirm("Delete this skill?")) return;
    try {
      await fetch(`/api/skills/${id}`, { method: "DELETE" });
      notify("success", "Skill deleted");
      if (editingSkillId === id) handleCancelEditSkill();
      fetchAllData();
    } catch (err: any) {
      notify("error", err.message);
    }
  };

  // DELETE CONTACT MESSAGE
  const handleDeleteMessage = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    try {
      await fetch(`/api/contact/${id}`, { method: "DELETE" });
      notify("success", "Message deleted");
      fetchAllData();
    } catch (err: any) {
      notify("error", err.message);
    }
  };

  const navTabs = [
    { id: "profile", label: "Profile & Hero", icon: <User className="w-4 h-4" /> },
    { id: "about", label: "About Me", icon: <User className="w-4 h-4" />, count: aboutList.length },
    { id: "education", label: "Education", icon: <GraduationCap className="w-4 h-4" />, count: educationList.length },
    { id: "experience", label: "Experience", icon: <Briefcase className="w-4 h-4" />, count: experienceList.length },
    { id: "projects", label: "Projects", icon: <FolderGit2 className="w-4 h-4" />, count: projectsList.length },
    { id: "gallery", label: "Gallery", icon: <ImageIcon className="w-4 h-4" />, count: galleryList.length },
    { id: "skills", label: "Skills", icon: <Cpu className="w-4 h-4" />, count: skillsList.length },
    { id: "messages", label: "Messages Inbox", icon: <Mail className="w-4 h-4" />, count: messagesList.length },
  ];

  return (
    <div className="min-h-screen bg-[#07080f] text-white">

      {/* TOP ADMIN HEADER */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#090a12]/90 border-b border-zinc-800/80 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>

            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-purple-950/80 border border-purple-500/50 text-purple-400">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-base font-bold text-white leading-tight">Admin Console</h1>
                <p className="text-[11px] font-mono text-cyan-400">MongoDB Atlas: Connected &amp; Live</p>
              </div>
            </div>
          </div>

          {/* Quick Actions: Seed & Visit Site */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleSeedDatabase}
              disabled={loading}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-white text-xs font-semibold transition-all hover:scale-105"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
              <span>Reset &amp; Seed Default Data</span>
            </button>

            <Link
              href="/"
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-md transition-all hover:scale-105"
            >
              <span>View Portfolio</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </header>

      {/* NOTIFICATION TOAST */}
      {status && (
        <div className="fixed top-20 right-6 z-50 animate-in slide-in-from-top-4 duration-200">
          <div
            className={`p-4 rounded-2xl flex items-center gap-2.5 text-xs font-bold shadow-2xl ${status.type === "success"
              ? "bg-emerald-950/90 border border-emerald-500 text-emerald-200"
              : "bg-red-950/90 border border-red-500 text-red-200"
              }`}
          >
            {status.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-400" />
            )}
            <span>{status.message}</span>
          </div>
        </div>
      )}

      {/* MAIN ADMIN CONTENT */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* TAB NAVIGATION BUTTONS */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-zinc-950 border border-zinc-800/90 overflow-x-auto mb-8">
          {navTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-sans font-semibold transition-all shrink-0 ${isActive
                  ? "bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                  }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${isActive ? "bg-purple-800 text-white" : "bg-zinc-800 text-zinc-400"
                    }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* TAB 1: PROFILE & HERO SECTION */}
        {activeTab === "profile" && (
          <div className="rounded-3xl bg-[#0c0e18] border border-zinc-800/90 p-6 sm:p-8 space-y-6">
            <div className="border-b border-zinc-800 pb-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">Hero &amp; Profile Settings</h2>
                <p className="text-xs text-zinc-400">Edit your name, titles, bio, location, resume link, avatar, and social channels.</p>
              </div>
              <button
                onClick={handleSaveProfile}
                disabled={loading}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-md transition-all hover:scale-105"
              >
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold text-zinc-300">Name</label>
                  <input
                    type="text"
                    value={profile.name || ""}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs sm:text-sm text-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold text-zinc-300">Main Title</label>
                  <input
                    type="text"
                    value={profile.title || ""}
                    onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs sm:text-sm text-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold text-zinc-300">Email Address</label>
                  <input
                    type="email"
                    value={profile.email || ""}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs sm:text-sm text-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold text-zinc-300">City / Location</label>
                  <input
                    type="text"
                    value={profile.location || ""}
                    onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs sm:text-sm text-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold text-zinc-300">Phone / Mobile</label>
                  <input
                    type="text"
                    value={profile.phone || ""}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    placeholder="e.g. 01707961402"
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs sm:text-sm text-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold text-zinc-300">Resume Link (URL)</label>
                  <input
                    type="text"
                    value={profile.resumeUrl || ""}
                    onChange={(e) => setProfile({ ...profile, resumeUrl: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs sm:text-sm text-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold text-zinc-300">LinkedIn Profile URL</label>
                  <input
                    type="text"
                    value={profile.linkedinUrl || ""}
                    onChange={(e) => setProfile({ ...profile, linkedinUrl: e.target.value })}
                    placeholder="https://linkedin.com/in/..."
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs sm:text-sm text-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold text-zinc-300">GitHub Profile URL</label>
                  <input
                    type="text"
                    value={profile.githubUrl || ""}
                    onChange={(e) => setProfile({ ...profile, githubUrl: e.target.value })}
                    placeholder="https://github.com/..."
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs sm:text-sm text-white"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-mono font-bold text-zinc-300">Avatar / Profile Icon Path</label>
                  <input
                    type="text"
                    value={profile.avatarUrl || ""}
                    onChange={(e) => setProfile({ ...profile, avatarUrl: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs sm:text-sm text-white"
                  />
                </div>

                <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white sm:col-span-2">
                  <input
                    type="checkbox"
                    id="availableForHire"
                    checked={profile.availableForHire ?? true}
                    onChange={(e) => setProfile({ ...profile, availableForHire: e.target.checked })}
                    className="w-4 h-4 rounded text-purple-600"
                  />
                  <label htmlFor="availableForHire" className="cursor-pointer">
                    Available For Hire / Active Freelance Status (Displays live pulse indicator on portfolio)
                  </label>
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-mono font-bold text-zinc-300">
                    Dynamic Roles Carousel (Comma-separated)
                  </label>
                  <input
                    type="text"
                    value={Array.isArray(profile.roles) ? profile.roles.join(", ") : ""}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        roles: e.target.value.split(",").map((s) => s.trim()),
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs sm:text-sm text-white"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-mono font-bold text-zinc-300">Hero Bio Summary</label>
                  <textarea
                    rows={3}
                    value={profile.bio || ""}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs sm:text-sm text-white resize-none"
                  />
                </div>

              </div>

              {/* ABOUT ME SECTION CONFIGURATION */}
              <div className="pt-6 border-t border-zinc-800 space-y-4">
                <div className="flex items-center gap-2 text-purple-400 font-mono text-sm font-bold">
                  <User className="w-4 h-4" />
                  <span>About Me Section Settings (Homepage 2-Column Section)</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-zinc-300">About Me Title / Headline</label>
                    <input
                      type="text"
                      value={profile.aboutTitle || ""}
                      onChange={(e) => setProfile({ ...profile, aboutTitle: e.target.value })}
                      placeholder="e.g. Junior Fullstack Developer"
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs sm:text-sm text-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-zinc-300">About Me Image Path / URL</label>
                    <input
                      type="text"
                      value={profile.aboutImage || ""}
                      onChange={(e) => setProfile({ ...profile, aboutImage: e.target.value })}
                      placeholder="e.g. /images/about-me.png or https://..."
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs sm:text-sm text-white"
                    />
                  </div>

                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-mono font-bold text-zinc-300">About Me Description / Detailed Story</label>
                    <textarea
                      rows={5}
                      value={profile.aboutDescription || ""}
                      onChange={(e) => setProfile({ ...profile, aboutDescription: e.target.value })}
                      placeholder="Write your comprehensive developer story and passion..."
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs sm:text-sm text-white resize-none leading-relaxed"
                    />
                  </div>
                </div>
              </div>

              {/* SOCIAL LINKS MANAGER */}
              <div className="pt-6 border-t border-zinc-800 space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
                      <Globe className="w-4 h-4 text-cyan-400" />
                      <span>Social Media &amp; Channels</span>
                    </h3>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      Add new social networks and control their visibility in Hero &amp; Contact sections.
                    </p>
                  </div>
                  <span className="text-[11px] font-mono text-zinc-500 bg-zinc-900 px-2.5 py-1 rounded-lg border border-zinc-800 self-start sm:self-auto">
                    {profile.socialLinks?.length || 0} Links Configured
                  </span>
                </div>

                {/* Existing Social Links */}
                <div className="space-y-2.5">
                  {(!profile.socialLinks || profile.socialLinks.length === 0) && (
                    <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 text-xs text-zinc-500 font-mono text-center">
                      No social links added yet. Use the form below to add your profiles.
                    </div>
                  )}

                  {profile.socialLinks?.map((link: any, idx: number) => {
                    const isHeroVisible = link.showInHero !== false;
                    const isContactVisible = link.showInContact !== false;

                    return (
                      <div
                        key={idx}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-xs hover:border-zinc-700 transition-all"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="p-2 rounded-lg bg-zinc-800 border border-zinc-700/80 text-cyan-400 shrink-0">
                            <SocialIcon iconName={link.iconName} platform={link.platform} className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="font-bold text-white flex items-center gap-2">
                              <span>{link.platform}</span>
                              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">
                                {link.iconName || "Globe"}
                              </span>
                            </div>
                            <div className="text-zinc-400 truncate max-w-xs sm:max-w-sm md:max-w-md text-[11px] font-mono">
                              {link.url}
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 self-end sm:self-auto shrink-0">
                          {/* Hero Toggle Badge */}
                          <button
                            type="button"
                            onClick={() => handleToggleSocialHero(idx)}
                            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-mono font-medium transition-all ${
                              isHeroVisible
                                ? "bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/80"
                                : "bg-zinc-800/80 border border-zinc-700 text-zinc-400 hover:bg-zinc-700/80"
                            }`}
                            title="Click to toggle visibility in Hero section"
                          >
                            {isHeroVisible ? <Eye className="w-3 h-3 text-emerald-400" /> : <EyeOff className="w-3 h-3 text-zinc-400" />}
                            <span>Hero: {isHeroVisible ? "ON" : "OFF"}</span>
                          </button>

                          {/* Contact Toggle Badge */}
                          <button
                            type="button"
                            onClick={() => handleToggleSocialContact(idx)}
                            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-mono font-medium transition-all ${
                              isContactVisible
                                ? "bg-purple-950/80 border border-purple-500/40 text-purple-300 hover:bg-purple-900/80"
                                : "bg-zinc-800/80 border border-zinc-700 text-zinc-400 hover:bg-zinc-700/80"
                            }`}
                            title="Click to toggle visibility in Contact section"
                          >
                            {isContactVisible ? <Eye className="w-3 h-3 text-purple-400" /> : <EyeOff className="w-3 h-3 text-zinc-400" />}
                            <span>Contact: {isContactVisible ? "ON" : "OFF"}</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleEditSocial(idx)}
                            className="p-1.5 rounded-lg text-purple-400 hover:bg-purple-950/60 border border-transparent hover:border-purple-500/30 transition-colors"
                            title="Edit social link"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRemoveSocial(idx)}
                            className="p-1.5 rounded-lg text-red-400 hover:bg-red-950/60 border border-transparent hover:border-red-500/30 transition-colors"
                            title="Delete social link"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Add / Edit Social Link Form */}
                <div className="p-4 sm:p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-4 shadow-inner">
                  <div className="text-xs font-mono font-bold text-zinc-300 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{editingSocialIndex !== null ? "Edit Social Media Link" : "Add New Social Media Link"}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                    <div className="sm:col-span-4">
                      <label className="text-[11px] font-mono text-zinc-400 mb-1 block">Platform Name</label>
                      <input
                        type="text"
                        placeholder="e.g. GitHub, Discord, LeetCode"
                        value={newSocial.platform}
                        onChange={(e) => setNewSocial({ ...newSocial, platform: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder:text-zinc-600 focus:border-cyan-500/60 outline-none"
                      />
                    </div>

                    <div className="sm:col-span-5">
                      <label className="text-[11px] font-mono text-zinc-400 mb-1 block">Profile / Channel URL</label>
                      <input
                        type="text"
                        placeholder="https://..."
                        value={newSocial.url}
                        onChange={(e) => setNewSocial({ ...newSocial, url: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder:text-zinc-600 focus:border-cyan-500/60 outline-none"
                      />
                    </div>

                    <div className="sm:col-span-3">
                      <label className="text-[11px] font-mono text-zinc-400 mb-1 block">Icon Symbol</label>
                      <select
                        value={newSocial.iconName}
                        onChange={(e) => setNewSocial({ ...newSocial, iconName: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:border-cyan-500/60 outline-none"
                      >
                        <option value="Github">GitHub</option>
                        <option value="Linkedin">LinkedIn</option>
                        <option value="Twitter">Twitter / X</option>
                        <option value="Discord">Discord</option>
                        <option value="Youtube">YouTube</option>
                        <option value="Facebook">Facebook</option>
                        <option value="Instagram">Instagram</option>
                        <option value="Telegram">Telegram</option>
                        <option value="Whatsapp">WhatsApp</option>
                        <option value="Leetcode">LeetCode</option>
                        <option value="Codeforces">Codeforces</option>
                        <option value="Hackerrank">HackerRank</option>
                        <option value="Kaggle">Kaggle</option>
                        <option value="Stackoverflow">Stack Overflow</option>
                        <option value="Devto">Dev.to</option>
                        <option value="Medium">Medium</option>
                        <option value="Twitch">Twitch</option>
                        <option value="Dribbble">Dribbble</option>
                        <option value="Behance">Behance</option>
                        <option value="Mail">Mail / Email</option>
                        <option value="Phone">Phone / Mobile</option>
                        <option value="Globe">Globe / Website</option>
                      </select>
                    </div>
                  </div>

                  {/* Section Visibility Checkboxes */}
                  <div className="flex flex-wrap items-center gap-6 pt-2 border-t border-zinc-900">
                    <label className="flex items-center gap-2 cursor-pointer text-xs text-zinc-300 select-none">
                      <input
                        type="checkbox"
                        checked={newSocial.showInHero !== false}
                        onChange={(e) => setNewSocial({ ...newSocial, showInHero: e.target.checked })}
                        className="w-4 h-4 rounded bg-zinc-900 border-zinc-700 text-cyan-600 focus:ring-0 cursor-pointer"
                      />
                      <span>Show in <strong className="text-white">Hero Section</strong></span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer text-xs text-zinc-300 select-none">
                      <input
                        type="checkbox"
                        checked={newSocial.showInContact !== false}
                        onChange={(e) => setNewSocial({ ...newSocial, showInContact: e.target.checked })}
                        className="w-4 h-4 rounded bg-zinc-900 border-zinc-700 text-purple-600 focus:ring-0 cursor-pointer"
                      />
                      <span>Show in <strong className="text-white">Contact Section</strong></span>
                    </label>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={handleAddSocial}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-all shadow-md cursor-pointer"
                    >
                      {editingSocialIndex !== null ? (
                        <>
                          <Save className="w-3.5 h-3.5" />
                          <span>Update Social Link</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add Social Link</span>
                        </>
                      )}
                    </button>
                    {editingSocialIndex !== null && (
                      <button
                        type="button"
                        onClick={handleCancelEditSocial}
                        className="px-3.5 py-2 rounded-xl bg-zinc-800 text-zinc-300 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>

              </div>
            </form>
          </div>
        )}

        {/* TAB: ABOUT ME SECTIONS */}
        {activeTab === "about" && (
          <div className="space-y-8">
            {/* Add / Edit About Section Form */}
            <div className="rounded-3xl bg-[#0c0e18] border border-purple-900/40 p-6 sm:p-8 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    {editingAboutId ? (
                      <>
                        <Edit3 className="w-5 h-5 text-purple-400" />
                        <span>Edit About Me Section</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-5 h-5 text-purple-400" />
                        <span>Add New About Me Section</span>
                      </>
                    )}
                  </h2>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Customize your About Me section (image on left, description and personal details on right). Positioned right before the Image Gallery on the homepage.
                  </p>
                </div>
                {editingAboutId && (
                  <button
                    type="button"
                    onClick={handleCancelEditAbout}
                    className="px-3 py-1.5 rounded-xl bg-zinc-800 text-zinc-400 hover:text-white text-xs font-semibold"
                  >
                    Cancel Edit
                  </button>
                )}
              </div>

              <form onSubmit={handleAddAbout} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Title */}
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-mono font-bold text-zinc-300">
                      Section Headline / Role Title (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Junior Fullstack Developer (Optional)"
                      value={aboutForm.title}
                      onChange={(e) => setAboutForm({ ...aboutForm, title: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs sm:text-sm text-white"
                    />
                  </div>

                  {/* Image Path / URL */}
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-mono font-bold text-zinc-300">
                      Image Path / URL (Left Column Photo) *
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="text"
                        required
                        placeholder="e.g. /images/about-me.png or https://..."
                        value={aboutForm.image}
                        onChange={(e) => setAboutForm({ ...aboutForm, image: e.target.value })}
                        className="flex-1 px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs sm:text-sm text-white"
                      />
                      <button
                        type="button"
                        onClick={() => setAboutForm({ ...aboutForm, image: "/images/about-me.png" })}
                        className="px-3 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-purple-300 text-xs font-mono shrink-0"
                      >
                        Default Photo
                      </button>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-mono font-bold text-zinc-300">
                      About Description / Bio Paragraph *
                    </label>
                    <textarea
                      rows={5}
                      required
                      placeholder="Write your detailed developer journey, passions, design philosophy..."
                      value={aboutForm.description}
                      onChange={(e) => setAboutForm({ ...aboutForm, description: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs sm:text-sm text-white resize-none leading-relaxed"
                    />
                  </div>

                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-zinc-300">Name (Optional)</label>
                    <input
                      type="text"
                      placeholder="Leave blank if not needed"
                      value={aboutForm.name}
                      onChange={(e) => setAboutForm({ ...aboutForm, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs sm:text-sm text-white"
                    />
                  </div>

                  {/* Location */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-zinc-300">Location (Optional)</label>
                    <input
                      type="text"
                      placeholder="Leave blank if not needed"
                      value={aboutForm.location}
                      onChange={(e) => setAboutForm({ ...aboutForm, location: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs sm:text-sm text-white"
                    />
                  </div>

                  {/* Gmail / Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-zinc-300">Gmail / Email (Optional)</label>
                    <input
                      type="email"
                      placeholder="Leave blank if not needed"
                      value={aboutForm.email}
                      onChange={(e) => setAboutForm({ ...aboutForm, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs sm:text-sm text-white"
                    />
                  </div>

                  {/* Mobile */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-zinc-300">Mobile / Phone (Optional)</label>
                    <input
                      type="text"
                      placeholder="Leave blank if not needed"
                      value={aboutForm.phone}
                      onChange={(e) => setAboutForm({ ...aboutForm, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs sm:text-sm text-white"
                    />
                  </div>

                  {/* Show Details Checkbox */}
                  <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white sm:col-span-2">
                    <input
                      type="checkbox"
                      id="aboutShowDetails"
                      checked={aboutForm.showDetails ?? false}
                      onChange={(e) => setAboutForm({ ...aboutForm, showDetails: e.target.checked })}
                      className="w-4 h-4 rounded text-purple-600"
                    />
                    <label htmlFor="aboutShowDetails" className="cursor-pointer">
                      Include Education &amp; Experience tabs preview in this section (Optional, unchecked by default)
                    </label>
                  </div>

                  {/* Order */}
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-mono font-bold text-zinc-300">Display Order (e.g. 1, 2...)</label>
                    <input
                      type="number"
                      value={aboutForm.order}
                      onChange={(e) => setAboutForm({ ...aboutForm, order: Number(e.target.value) })}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs sm:text-sm text-white"
                    />
                  </div>

                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-md transition-all hover:scale-105 disabled:opacity-50"
                  >
                    {editingAboutId ? (
                      <>
                        <Save className="w-4 h-4" />
                        <span>Update Section</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        <span>Add Section</span>
                      </>
                    )}
                  </button>
                  {editingAboutId && (
                    <button
                      type="button"
                      onClick={handleCancelEditAbout}
                      className="px-4 py-2.5 rounded-xl bg-zinc-800 text-zinc-300 hover:text-white text-xs font-semibold"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* List of Existing About Sections */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
                <User className="w-4 h-4 text-purple-400" />
                <span>Existing About Sections ({aboutList.length})</span>
              </h3>

              {aboutList.length === 0 ? (
                <div className="p-8 rounded-3xl bg-[#0c0e18] border border-zinc-800 text-center text-zinc-500 text-xs font-mono">
                  No custom about sections created yet. Default profile info is currently rendered on the portfolio.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {aboutList.map((item, idx) => (
                    <div
                      key={item._id || idx}
                      className="p-5 rounded-3xl bg-[#0c0e18] border border-zinc-800 hover:border-purple-500/50 transition-all flex flex-col justify-between gap-4 group shadow-md"
                    >
                      <div className="flex gap-4">
                        <div className="relative w-20 h-24 rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-700 shrink-0">
                          <img
                            src={item.image || "/images/about-me.png"}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="space-y-1 min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] px-2 py-0.5 rounded-md bg-purple-950/80 border border-purple-500/40 text-purple-300 font-mono font-bold">
                              Order #{item.order ?? idx + 1}
                            </span>
                          </div>
                          <h4 className="font-bold text-white text-sm truncate">{item.title}</h4>
                          <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed">{item.description}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between border-t border-zinc-800/80 pt-3">
                        <span className="text-[11px] text-zinc-500 font-mono">
                          {item.location || "Default Location"}
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleEditAbout(item)}
                            className="p-1.5 rounded-lg text-purple-400 hover:bg-purple-950/60 transition-colors"
                            title="Edit"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteAbout(item._id)}
                            className="p-1.5 rounded-lg text-red-400 hover:bg-red-950/60 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: EDUCATION */}
        {activeTab === "education" && (
          <div className="space-y-8">
            {/* Add / Edit Education Form */}
            <div className="rounded-3xl bg-[#0c0e18] border border-cyan-900/40 p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  {editingEduId ? (
                    <>
                      <Edit3 className="w-5 h-5 text-cyan-400" />
                      <span>Edit Academic Degree / Education</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5 text-cyan-400" />
                      <span>Add Academic Degree / Education</span>
                    </>
                  )}
                </h2>
                {editingEduId && (
                  <button
                    type="button"
                    onClick={handleCancelEditEducation}
                    className="px-3 py-1.5 rounded-xl bg-zinc-800 text-zinc-400 hover:text-white text-xs font-semibold"
                  >
                    Cancel Edit
                  </button>
                )}
              </div>

              <form onSubmit={handleAddEducation} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-mono font-bold text-zinc-300">Degree Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. B.Sc. in Computer Science & Engineering"
                      value={eduForm.degree}
                      onChange={(e) => setEduForm({ ...eduForm, degree: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs sm:text-sm text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono font-bold text-zinc-300">University / Institution</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Leading University"
                      value={eduForm.university}
                      onChange={(e) => setEduForm({ ...eduForm, university: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs sm:text-sm text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono font-bold text-zinc-300">Timeline Bound</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 2021 - 2025"
                      value={eduForm.timeBound}
                      onChange={(e) => setEduForm({ ...eduForm, timeBound: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs sm:text-sm text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono font-bold text-zinc-300">CGPA / Grade</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 3.85 / 4.00"
                      value={eduForm.cgpa}
                      onChange={(e) => setEduForm({ ...eduForm, cgpa: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs sm:text-sm text-white"
                    />
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-xs font-mono font-bold text-zinc-300">Location</label>
                    <input
                      type="text"
                      placeholder="e.g. Sylhet, Bangladesh"
                      value={eduForm.location}
                      onChange={(e) => setEduForm({ ...eduForm, location: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs sm:text-sm text-white"
                    />
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-xs font-mono font-bold text-zinc-300">Coursework (Comma-separated)</label>
                    <input
                      type="text"
                      placeholder="Data Structures & Algorithms, Distributed Systems, Cloud Computing, DBMS"
                      value={eduForm.coursework}
                      onChange={(e) => setEduForm({ ...eduForm, coursework: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs sm:text-sm text-white"
                    />
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-xs font-mono font-bold text-zinc-300">Academic Highlights (Comma-separated)</label>
                    <input
                      type="text"
                      placeholder="Dean's Honor List, President of Club, Top 10 Hackathon Finalist"
                      value={eduForm.highlights}
                      onChange={(e) => setEduForm({ ...eduForm, highlights: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs sm:text-sm text-white"
                    />
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-xs font-mono font-bold text-zinc-300">Full Academic Description &amp; Overview</label>
                    <textarea
                      rows={3}
                      placeholder="Detailed overview of research, academic background, and honors..."
                      value={eduForm.description}
                      onChange={(e) => setEduForm({ ...eduForm, description: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs sm:text-sm text-white resize-none"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-md transition-all hover:scale-105 flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>{editingEduId ? "Update Education Record" : "Save Education Record"}</span>
                  </button>
                  {editingEduId && (
                    <button
                      type="button"
                      onClick={handleCancelEditEducation}
                      className="px-4 py-2.5 rounded-xl bg-zinc-800 text-zinc-300 hover:text-white text-xs font-semibold"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Existing Education List */}
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white font-mono">Current Education Records ({educationList.length})</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {educationList.map((edu) => (
                  <div key={edu._id} className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 flex justify-between gap-4 transition-all hover:border-cyan-500/40">
                    <div className="space-y-1 text-xs flex-1">
                      <div className="text-cyan-400 font-bold text-sm">{edu.degree}</div>
                      <div className="text-white font-semibold">{edu.university}</div>
                      <div className="text-zinc-400">{edu.timeBound} | CGPA: {edu.cgpa}</div>
                      {edu.location && <div className="text-zinc-500 text-[11px]">📍 {edu.location}</div>}
                      <p className="text-zinc-400 line-clamp-2 pt-1">{edu.description}</p>
                    </div>
                    <div className="flex flex-col gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleEditEducation(edu)}
                        className="px-2.5 py-1.5 rounded-xl bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-900/80 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteEducation(edu._id)}
                        className="p-1.5 rounded-xl text-red-400 hover:bg-red-950/60 transition-colors self-center"
                        title="Delete education record"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: EXPERIENCE */}
        {activeTab === "experience" && (
          <div className="space-y-8">
            {/* Add / Edit Experience Form */}
            <div className="rounded-3xl bg-[#0c0e18] border border-emerald-900/40 p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  {editingExpId ? (
                    <>
                      <Edit3 className="w-5 h-5 text-emerald-400" />
                      <span>Edit Professional Experience</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5 text-emerald-400" />
                      <span>Add Professional Experience</span>
                    </>
                  )}
                </h2>
                {editingExpId && (
                  <button
                    type="button"
                    onClick={handleCancelEditExperience}
                    className="px-3 py-1.5 rounded-xl bg-zinc-800 text-zinc-400 hover:text-white text-xs font-semibold"
                  >
                    Cancel Edit
                  </button>
                )}
              </div>

              <form onSubmit={handleAddExperience} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-mono font-bold text-zinc-300">Company Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Betopia Tech Solutions"
                      value={expForm.company}
                      onChange={(e) => setExpForm({ ...expForm, company: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs sm:text-sm text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono font-bold text-zinc-300">Role / Position</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Full Stack Software Engineer"
                      value={expForm.role}
                      onChange={(e) => setExpForm({ ...expForm, role: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs sm:text-sm text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono font-bold text-zinc-300">Timeline</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 2024 - Present"
                      value={expForm.timeBound}
                      onChange={(e) => setExpForm({ ...expForm, timeBound: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs sm:text-sm text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono font-bold text-zinc-300">Location</label>
                    <input
                      type="text"
                      placeholder="e.g. Remote / Hybrid / Dhaka"
                      value={expForm.location}
                      onChange={(e) => setExpForm({ ...expForm, location: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs sm:text-sm text-white"
                    />
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-xs font-mono font-bold text-zinc-300">Technologies Used (Comma-separated)</label>
                    <input
                      type="text"
                      placeholder="Next.js, TypeScript, Node.js, Redis, RabbitMQ, MongoDB, Docker, AWS"
                      value={expForm.technologies}
                      onChange={(e) => setExpForm({ ...expForm, technologies: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs sm:text-sm text-white"
                    />
                  </div>

                  <div className="space-y-3 sm:col-span-2">
                    <div className="flex items-center justify-between pb-1">
                      <label className="text-xs font-mono font-bold text-zinc-300 flex items-center gap-2">
                        <span>Key Responsibilities</span>
                        <span className="text-[11px] font-normal text-emerald-400 font-mono">
                          ({expForm.responsibilities.filter((r) => r.trim().length > 0).length} items)
                        </span>
                      </label>
                      <button
                        type="button"
                        onClick={handleAddResponsibilityField}
                        className="px-3 py-1.5 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-semibold flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 shadow-sm"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Responsibility</span>
                      </button>
                    </div>

                    <div className="space-y-2.5">
                      {expForm.responsibilities.map((resp, idx) => (
                        <div key={idx} className="flex items-center gap-2 group/field">
                          <span className="w-7 h-7 rounded-lg bg-zinc-800/80 border border-zinc-700/50 flex items-center justify-center text-xs font-mono text-zinc-400 font-bold shrink-0">
                            {idx + 1}
                          </span>
                          <input
                            type="text"
                            placeholder="e.g. Engineered low-latency WebSockets & RabbitMQ event pipelines handling 100K+ concurrent events"
                            value={resp}
                            onChange={(e) => handleUpdateResponsibilityField(idx, e.target.value)}
                            className="flex-1 px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs sm:text-sm text-white focus:border-emerald-500 focus:outline-none transition-colors"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveResponsibilityField(idx)}
                            disabled={expForm.responsibilities.length === 1 && resp === ""}
                            className="p-2.5 rounded-xl bg-zinc-900 hover:bg-red-950/60 border border-zinc-800 hover:border-red-500/40 text-zinc-400 hover:text-red-400 transition-colors disabled:opacity-30 disabled:pointer-events-none shrink-0"
                            title="Remove this responsibility"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-xs font-mono font-bold text-zinc-300">Role Description</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Summary of engineering focus and impact at this organization..."
                      value={expForm.description}
                      onChange={(e) => setExpForm({ ...expForm, description: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs sm:text-sm text-white resize-none"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all hover:scale-105 flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>{editingExpId ? "Update Experience Entry" : "Save Experience Entry"}</span>
                  </button>
                  {editingExpId && (
                    <button
                      type="button"
                      onClick={handleCancelEditExperience}
                      className="px-4 py-2.5 rounded-xl bg-zinc-800 text-zinc-300 hover:text-white text-xs font-semibold"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* List */}
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white font-mono">Current Experience Entries ({experienceList.length})</h3>
              <div className="space-y-4">
                {experienceList.map((exp) => (
                  <div key={exp._id} className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 flex justify-between items-start gap-4 transition-all hover:border-emerald-500/40">
                    <div className="space-y-1.5 text-xs flex-1">
                      <div className="text-emerald-400 font-bold text-sm">{exp.role}</div>
                      <div className="text-white font-semibold">{exp.company} | {exp.timeBound}</div>
                      {exp.location && <div className="text-zinc-500 text-[11px]">📍 {exp.location}</div>}
                      <p className="text-zinc-300 pt-1">{exp.description}</p>
                      {Array.isArray(exp.responsibilities) && exp.responsibilities.length > 0 && (
                        <div className="pt-2">
                          <div className="text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-wider mb-1">Responsibilities:</div>
                          <ul className="list-disc list-inside text-zinc-400 text-xs space-y-0.5">
                            {exp.responsibilities.map((r: string, idx: number) => (
                              <li key={idx} className="leading-relaxed">{r}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleEditExperience(exp)}
                        className="px-3 py-1.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/80 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteExperience(exp._id)}
                        className="p-1.5 rounded-xl text-red-400 hover:bg-red-950/60 transition-colors"
                        title="Delete experience entry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: PROJECTS */}
        {activeTab === "projects" && (
          <div className="space-y-8">
            {/* Add / Edit Project Form */}
            <div className="rounded-3xl bg-[#0c0e18] border border-purple-900/40 p-6 sm:p-8 space-y-5">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  {editingProjectId ? (
                    <>
                      <Edit3 className="w-5 h-5 text-purple-400" />
                      <span>Edit Project Details</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5 text-purple-400" />
                      <span>Add New Portfolio Project</span>
                    </>
                  )}
                </h2>
                {editingProjectId && (
                  <button
                    type="button"
                    onClick={handleCancelEditProject}
                    className="px-3 py-1.5 rounded-xl bg-zinc-800 text-zinc-400 hover:text-white text-xs font-semibold"
                  >
                    Cancel Edit
                  </button>
                )}
              </div>

              <form onSubmit={handleAddProject} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-mono font-bold text-zinc-300">Project Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Libra, Betopia Orbital Engine"
                      value={projectForm.title}
                      onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs sm:text-sm text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono font-bold text-zinc-300">Preview Image URL / SVG</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. /images/libra-preview.svg or Unsplash URL"
                      value={projectForm.image}
                      onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs sm:text-sm text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono font-bold text-zinc-300">Live Website URL</label>
                    <input
                      type="text"
                      placeholder="https://..."
                      value={projectForm.liveUrl}
                      onChange={(e) => setProjectForm({ ...projectForm, liveUrl: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs sm:text-sm text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono font-bold text-zinc-300">Github Repository URL</label>
                    <input
                      type="text"
                      placeholder="https://github.com/..."
                      value={projectForm.githubUrl}
                      onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs sm:text-sm text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono font-bold text-zinc-300">Frontend Repo (Optional)</label>
                    <input
                      type="text"
                      placeholder="https://github.com/...-frontend"
                      value={projectForm.githubFrontend}
                      onChange={(e) => setProjectForm({ ...projectForm, githubFrontend: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs sm:text-sm text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono font-bold text-zinc-300">Backend Repo (Optional)</label>
                    <input
                      type="text"
                      placeholder="https://github.com/...-backend"
                      value={projectForm.githubBackend}
                      onChange={(e) => setProjectForm({ ...projectForm, githubBackend: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs sm:text-sm text-white"
                    />
                  </div>

                  {/* Multiple Slider Images for Expand Modal Slider */}
                  <div className="space-y-2 sm:col-span-2 p-4 rounded-2xl bg-zinc-950/60 border border-purple-900/30">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-mono font-bold text-purple-300 flex items-center gap-1.5">
                        <ImageIcon className="w-3.5 h-3.5 text-purple-400" />
                        <span>Project Slider Images (Multiple Screenshots for Expand Modal Slider)</span>
                      </label>
                      <span className="text-[11px] text-zinc-400 font-normal">One per line or comma-separated</span>
                    </div>

                    <textarea
                      rows={3}
                      placeholder={"/projectimg/wardrop.png\n/projectimg/salon.png\n/projectimg/uber.png\nhttps://example.com/screenshot.png"}
                      value={projectForm.images}
                      onChange={(e) => setProjectForm({ ...projectForm, images: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs sm:text-sm text-white font-mono resize-none focus:border-purple-500 focus:outline-none"
                    />

                    {/* Quick Add Available Local Images */}
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[11px] text-zinc-400 font-mono">Quick Click to Add Local Screenshot:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {[
                          "/projectimg/wardrop.png",
                          "/projectimg/salon.png",
                          "/projectimg/uber.png",
                          "/projectimg/bookly.png",
                          "/projectimg/blueStar.png",
                          "/projectimg/smokenza.png",
                          "/projectimg/shahalam.png",
                        ].map((imgPath) => (
                          <button
                            key={imgPath}
                            type="button"
                            onClick={() => {
                              const current = projectForm.images
                                ? projectForm.images.split(/[\n,]/).map((s) => s.trim()).filter(Boolean)
                                : [];
                              if (!current.includes(imgPath)) {
                                setProjectForm({
                                  ...projectForm,
                                  images: [...current, imgPath].join("\n"),
                                });
                              }
                            }}
                            className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-purple-950 hover:border-purple-500/50 border border-zinc-800 text-[11px] font-mono text-zinc-300 transition-all hover:scale-105 cursor-pointer"
                          >
                            + {imgPath.replace("/projectimg/", "")}
                          </button>
                        ))}
                      </div>
                    </div>

                    <p className="text-[11px] text-zinc-400">
                      Add multiple image paths or URLs (one per line or comma-separated). When more than 1 image is added, visitors can slide through them in the expanded project modal using the left/right arrow buttons, keyboard arrows, or clickable thumbnails.
                    </p>

                    {/* Live Thumbnail Preview with 1-Click Delete */}
                    {projectForm.images && projectForm.images.trim() && (
                      <div className="pt-2 border-t border-zinc-900 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] text-zinc-400 font-mono">
                            Slide Screenshots ({projectForm.images.split(/[\n,]/).map((s) => s.trim()).filter(Boolean).length}):
                          </span>
                          <span className="text-[10px] text-zinc-500 font-mono">Hover to remove</span>
                        </div>
                        <div className="flex flex-wrap gap-2.5 pt-1">
                          {projectForm.images.split(/[\n,]/).map((s) => s.trim()).filter(Boolean).map((imgUrl, i) => (
                            <div key={i} className="relative w-16 h-12 rounded-lg overflow-hidden border border-purple-500/40 bg-zinc-900 shrink-0 group/thumb">
                              <img src={getSafeImageUrl(imgUrl)} alt={`Slide ${i + 1}`} className="w-full h-full object-cover" />
                              <span className="absolute bottom-0 right-0 px-1 py-0.2 text-[9px] bg-black/80 font-mono text-purple-300 font-bold rounded-tl">
                                {i + 1}
                              </span>
                              <button
                                type="button"
                                onClick={() => {
                                  const current = projectForm.images
                                    .split(/[\n,]/)
                                    .map((s) => s.trim())
                                    .filter(Boolean);
                                  const filtered = current.filter((_, idx) => idx !== i);
                                  setProjectForm({
                                    ...projectForm,
                                    images: filtered.join("\n"),
                                  });
                                }}
                                className="absolute inset-0 bg-black/70 opacity-0 group-hover/thumb:opacity-100 flex items-center justify-center text-red-400 hover:text-red-300 transition-opacity cursor-pointer"
                                title="Remove this screenshot"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Bullet Points / Features (Each line = 1 bullet point) */}
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-xs font-mono font-bold text-purple-300 flex items-center justify-between">
                      <span>Key Features / Bullet Points (One per line)</span>
                      <span className="text-[11px] text-zinc-400 font-normal">Shows as • bullet points on the card</span>
                    </label>
                    <textarea
                      rows={3}
                      placeholder={"View, add, edit, and delete books\nView aggregated borrow summary\nAuto-update availability based on copies"}
                      value={projectForm.features}
                      onChange={(e) => setProjectForm({ ...projectForm, features: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs sm:text-sm text-white font-mono resize-none"
                    />
                  </div>

                  {/* Technology Icons from Backend */}
                  <div className="space-y-2 sm:col-span-2 p-4 rounded-2xl bg-zinc-950/60 border border-purple-900/30">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-mono font-bold text-purple-300 flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-purple-400" />
                        <span>Technology Icons (Stored in Backend / DB)</span>
                      </label>
                      <span className="text-[11px] text-zinc-400">Comma-separated icon names or paths</span>
                    </div>

                    <input
                      type="text"
                      placeholder="html, css, tailwind, typescript, react, redux, nodejs, express, mongodb, jwt"
                      value={projectForm.icons}
                      onChange={(e) => setProjectForm({ ...projectForm, icons: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs sm:text-sm text-white font-mono"
                    />

                    {/* Quick Add Preset Buttons */}
                    <div className="space-y-1 pt-1">
                      <span className="text-[11px] text-zinc-400 font-mono">Quick Click to Add Icon:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {[
                          "html", "css", "tailwind", "typescript", "react", "redux", "zustand",
                          "nodejs", "express", "mongodb", "jwt", "nextjs", "docker", "redis",
                          "rabbitmq", "aws", "git", "postman", "cpp"
                        ].map((tech) => (
                          <button
                            key={tech}
                            type="button"
                            onClick={() => {
                              const current = projectForm.icons
                                ? projectForm.icons.split(",").map((s) => s.trim()).filter(Boolean)
                                : [];
                              if (!current.includes(tech)) {
                                setProjectForm({
                                  ...projectForm,
                                  icons: [...current, tech].join(", "),
                                });
                              }
                            }}
                            className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-purple-950 hover:border-purple-500/50 border border-zinc-800 text-[11px] font-mono text-zinc-300 transition-colors"
                          >
                            +{tech}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Live Preview of Icons */}
                    {projectForm.icons && (
                      <div className="pt-2 border-t border-zinc-900 flex items-center gap-2">
                        <span className="text-[11px] text-zinc-400 font-mono">Live Icon Preview:</span>
                        <div className="flex flex-wrap items-center gap-2">
                          {projectForm.icons.split(",").map((ic) => ic.trim()).filter(Boolean).map((ic, i) => (
                            <TechIcon key={i} icon={ic} size={20} />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white sm:col-span-2 select-none">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={projectForm.featured}
                      onChange={(e) => setProjectForm({ ...projectForm, featured: e.target.checked })}
                      className="w-4 h-4 rounded text-purple-600 bg-zinc-800 border-zinc-700 cursor-pointer focus:ring-purple-500"
                    />
                    <label htmlFor="featured" className="cursor-pointer font-semibold flex items-center gap-2">
                      <span>Show on Home Page (Featured Section)</span>
                      <span className="text-[11px] text-zinc-400 font-normal">
                        ({projectForm.featured ? "Visible in Home Featured list" : "Hidden from Home, only shown in All Projects"})
                      </span>
                    </label>
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-xs font-mono font-bold text-zinc-300">Short Description</label>
                    <input
                      type="text"
                      required
                      placeholder="Summary describing the project..."
                      value={projectForm.shortDescription}
                      onChange={(e) => setProjectForm({ ...projectForm, shortDescription: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs sm:text-sm text-white"
                    />
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-xs font-mono font-bold text-zinc-300">Full Technical Description &amp; Architecture Notes</label>
                    <textarea
                      rows={3}
                      placeholder="Extended details shown in the inspect modal..."
                      value={projectForm.fullDescription}
                      onChange={(e) => setProjectForm({ ...projectForm, fullDescription: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs sm:text-sm text-white resize-none"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md transition-all hover:scale-105 flex items-center gap-2 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>{editingProjectId ? "Update Project" : "Save Project"}</span>
                  </button>
                  {editingProjectId && (
                    <button
                      type="button"
                      onClick={handleCancelEditProject}
                      className="px-4 py-2.5 rounded-xl bg-zinc-800 text-zinc-300 hover:text-white text-xs font-semibold cursor-pointer"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Current Projects in Database */}
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white font-mono">
                Projects in Database ({projectsList.length})
              </h3>
              <div className="space-y-4">
                {projectsList.map((proj) => (
                  <div
                    key={proj._id}
                    className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all hover:border-purple-500/40"
                  >
                    <div className="space-y-2 text-xs flex-1">
                      <div className="flex items-center gap-2.5">
                        <span className="text-purple-400 font-bold text-sm sm:text-base">{proj.title}</span>
                        {proj.featured !== false ? (
                          <span className="px-2.5 py-0.5 rounded-full bg-purple-950 border border-purple-500/40 text-purple-300 text-[10px] font-mono font-bold flex items-center gap-1">
                            <Eye className="w-3 h-3 text-purple-400" />
                            FEATURED ON HOME
                          </span>
                        ) : (
                          <span className="px-2.5 py-0.5 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-400 text-[10px] font-mono font-bold flex items-center gap-1">
                            <EyeOff className="w-3 h-3 text-zinc-500" />
                            HIDDEN FROM HOME
                          </span>
                        )}
                      </div>
                      <p className="text-zinc-300 line-clamp-2 max-w-3xl">{proj.shortDescription}</p>

                      {/* Icons Preview */}
                      {proj.icons && proj.icons.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1.5 pt-1">
                          <span className="text-[10px] font-mono text-zinc-500">Icons:</span>
                          {proj.icons.map((ic: string, i: number) => (
                            <TechIcon key={i} icon={ic} size={18} />
                          ))}
                        </div>
                      )}

                      <div className="flex flex-wrap items-center gap-4 text-zinc-500 text-[11px] pt-1">
                        {proj.liveUrl && (
                          <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline flex items-center gap-1">
                            <Globe className="w-3 h-3" /> Live
                          </a>
                        )}
                        {(proj.githubUrl || proj.githubFrontend) && (
                          <a href={proj.githubUrl || proj.githubFrontend} target="_blank" rel="noreferrer" className="text-purple-300 hover:underline flex items-center gap-1">
                            Github
                          </a>
                        )}
                        {proj.features?.length > 0 && (
                          <span className="text-zinc-400">• {proj.features.length} bullet points</span>
                        )}
                        {Array.isArray(proj.images) && proj.images.length > 0 && (
                          <span className="text-purple-400 flex items-center gap-1 font-mono">
                            <ImageIcon className="w-3 h-3" /> {proj.images.length} slide images
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center flex-wrap">
                      {/* 1-Click Toggle Featured Button */}
                      <button
                        type="button"
                        onClick={() => handleToggleProjectFeatured(proj)}
                        className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                          proj.featured !== false
                            ? "bg-purple-950/60 border-purple-500/40 text-purple-300 hover:bg-purple-900/80"
                            : "bg-zinc-800/90 border-zinc-700 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-700"
                        }`}
                        title="Toggle visibility on Home Page"
                      >
                        {proj.featured !== false ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                        <span>{proj.featured !== false ? "Visible on Home" : "Hidden from Home"}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleEditProject(proj)}
                        className="px-3 py-1.5 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-200 hover:text-white hover:bg-zinc-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteProject(proj._id)}
                        className="p-2 rounded-xl text-red-400 hover:bg-red-950/60 transition-colors cursor-pointer"
                        title="Delete project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: GALLERY */}
        {activeTab === "gallery" && (
          <div className="space-y-8">
            <div className="rounded-3xl bg-[#0c0e18] border border-amber-900/40 p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  {editingGalleryId ? (
                    <>
                      <Edit3 className="w-5 h-5 text-amber-400" />
                      <span>Edit Gallery Slide Image</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5 text-amber-400" />
                      <span>Add Gallery Slide Image</span>
                    </>
                  )}
                </h2>
                {editingGalleryId && (
                  <button
                    type="button"
                    onClick={handleCancelEditGallery}
                    className="px-3 py-1.5 rounded-xl bg-zinc-800 text-zinc-400 hover:text-white text-xs font-semibold"
                  >
                    Cancel Edit
                  </button>
                )}
              </div>

              <form onSubmit={handleAddGallery} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-mono font-bold text-zinc-300">Image Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Cybernetic UI & Architecture"
                      value={galleryForm.title}
                      onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs sm:text-sm text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono font-bold text-zinc-300">Image URL</label>
                    <input
                      type="text"
                      required
                      placeholder="https://images.unsplash.com/... or /images/..."
                      value={galleryForm.imageUrl}
                      onChange={(e) => setGalleryForm({ ...galleryForm, imageUrl: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs sm:text-sm text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono font-bold text-zinc-300">Category Tag</label>
                    <input
                      type="text"
                      placeholder="e.g. Frontend Architecture, Cloud & DevOps"
                      value={galleryForm.category}
                      onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs sm:text-sm text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono font-bold text-zinc-300">Caption / Subtitle</label>
                    <input
                      type="text"
                      placeholder="Snapshot caption describing the visual showcase..."
                      value={galleryForm.caption}
                      onChange={(e) => setGalleryForm({ ...galleryForm, caption: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs sm:text-sm text-white"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-md transition-all hover:scale-105 flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>{editingGalleryId ? "Update Gallery Slide" : "Save Gallery Slide"}</span>
                  </button>
                  {editingGalleryId && (
                    <button
                      type="button"
                      onClick={handleCancelEditGallery}
                      className="px-4 py-2.5 rounded-xl bg-zinc-800 text-zinc-300 hover:text-white text-xs font-semibold"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="space-y-4">
              <h3 className="text-base font-bold text-white font-mono">Gallery Slides ({galleryList.length})</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {galleryList.map((item) => (
                  <div key={item._id} className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3 transition-all hover:border-amber-500/40">
                    <img src={item.imageUrl} alt={item.title} className="w-full h-36 object-cover rounded-xl" />
                    <div className="flex justify-between items-start gap-2 pt-1 text-xs">
                      <div className="space-y-0.5 flex-1 min-w-0">
                        <div className="font-bold text-white truncate">{item.title}</div>
                        <div className="text-amber-400 font-mono text-[10px]">{item.category}</div>
                        <div className="text-zinc-400 text-[11px] line-clamp-2">{item.caption}</div>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleEditGallery(item)}
                          className="p-1.5 rounded-lg text-amber-400 hover:bg-amber-950/60 transition-colors"
                          title="Edit gallery slide"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteGallery(item._id)}
                          className="p-1.5 rounded-lg text-red-400 hover:bg-red-950/60 transition-colors"
                          title="Delete gallery slide"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: SKILLS */}
        {activeTab === "skills" && (
          <div className="space-y-8">
            <div className="rounded-3xl bg-[#0c0e18] border border-cyan-900/40 p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  {editingSkillId ? (
                    <>
                      <Edit3 className="w-5 h-5 text-cyan-400" />
                      <span>Edit Skill &amp; Technology</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5 text-cyan-400" />
                      <span>Add Skill &amp; Technology</span>
                    </>
                  )}
                </h2>
                {editingSkillId && (
                  <button
                    type="button"
                    onClick={handleCancelEditSkill}
                    className="px-3 py-1.5 rounded-xl bg-zinc-800 text-zinc-400 hover:text-white text-xs font-semibold"
                  >
                    Cancel Edit
                  </button>
                )}
              </div>

              <form onSubmit={handleAddSkill} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-mono font-bold text-zinc-300">Skill Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Next.js, Redis"
                      value={skillForm.name}
                      onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs sm:text-sm text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono font-bold text-zinc-300">Category</label>
                    <select
                      value={skillForm.category}
                      onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value as any })}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs sm:text-sm text-white"
                    >
                      <option value="frontend">Frontend</option>
                      <option value="backend">Backend</option>
                      <option value="tools">Tools</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono font-bold text-zinc-300">Icon Path</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. /icons/nextjs.svg"
                      value={skillForm.iconPath}
                      onChange={(e) => setSkillForm({ ...skillForm, iconPath: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs sm:text-sm text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono font-bold text-zinc-300">Border Color (Hex)</label>
                    <input
                      type="text"
                      placeholder="Hex: #38bdf8"
                      value={skillForm.borderColor}
                      onChange={(e) => setSkillForm({ ...skillForm, borderColor: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs sm:text-sm text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono font-bold text-zinc-300">Text Hover Color (Hex)</label>
                    <input
                      type="text"
                      placeholder="Hex: #38bdf8"
                      value={skillForm.textColor}
                      onChange={(e) => setSkillForm({ ...skillForm, textColor: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs sm:text-sm text-white"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-md transition-all hover:scale-105 flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>{editingSkillId ? "Update Skill" : "Save Skill"}</span>
                  </button>
                  {editingSkillId && (
                    <button
                      type="button"
                      onClick={handleCancelEditSkill}
                      className="px-4 py-2.5 rounded-xl bg-zinc-800 text-zinc-300 hover:text-white text-xs font-semibold"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="space-y-4">
              <h3 className="text-base font-bold text-white font-mono">Registered Skills ({skillsList.length})</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {skillsList.map((skill) => (
                  <div key={skill._id} className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col items-center justify-between text-center gap-2 transition-all hover:border-cyan-500/40">
                    <img src={skill.iconPath} alt={skill.name} className="w-8 h-8 object-contain" />
                    <div className="text-xs font-bold text-white truncate w-full">{skill.name}</div>
                    <span className="text-[10px] uppercase font-mono text-zinc-400">{skill.category}</span>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleEditSkill(skill)}
                        className="p-1 rounded-lg text-cyan-400 hover:bg-cyan-950/60 transition-colors"
                        title="Edit skill"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteSkill(skill._id)}
                        className="p-1 rounded-lg text-red-400 hover:bg-red-950/60 transition-colors"
                        title="Delete skill"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: MESSAGES INBOX */}
        {activeTab === "messages" && (
          <div className="space-y-6">
            <div className="border-b border-zinc-800 pb-4">
              <h2 className="text-xl font-bold text-white">Contact Form Messages Inbox ({messagesList.length})</h2>
              <p className="text-xs text-zinc-400">All submissions sent from the public contact form.</p>
            </div>

            {messagesList.length === 0 ? (
              <div className="p-12 text-center text-zinc-500 font-mono text-xs">
                No messages received yet.
              </div>
            ) : (
              <div className="space-y-4">
                {messagesList.map((msg) => (
                  <div key={msg._id} className="p-6 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800 pb-3">
                      <div>
                        <h4 className="text-base font-bold text-white">{msg.name}</h4>
                        <a href={`mailto:${msg.email}`} className="text-xs text-cyan-400 font-mono hover:underline">
                          {msg.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[11px] font-mono text-zinc-400">
                          {new Date(msg.createdAt).toLocaleString()}
                        </span>
                        <button
                          onClick={() => handleDeleteMessage(msg._id)}
                          className="p-1.5 rounded-lg text-red-400 hover:bg-red-950/60"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <p className="text-zinc-200 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                      {msg.message}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-[11px] text-zinc-400 pt-2 border-t border-zinc-800/60 font-mono">
                      {msg.address && <span>📍 Address: {msg.address}</span>}
                      {msg.location && <span>🌍 Location: {msg.location}</span>}
                      {msg.linkedin && (
                        <a href={msg.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                          🔗 LinkedIn
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </main>
    </div>
  );
}
