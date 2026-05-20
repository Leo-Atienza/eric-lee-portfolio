// Centralized GSAP plugin registration. Side-effect import — pull this in once
// at the top of App.tsx so every downstream component sees ScrollTrigger ready.
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
