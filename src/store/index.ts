import type { Coin, CertificateSource } from "@/types";
import { atom } from "nanostores";

export const currentCoin = atom<Coin>("coin-2");

export const currentSource = atom<CertificateSource>("threejs");
