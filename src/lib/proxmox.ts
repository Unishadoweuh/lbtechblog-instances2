import { queryOptions, mutationOptions } from "@tanstack/react-query"
import type { ProxmoxNode, ProxmoxVM, ProxmoxSnapshot } from "@/types/proxmox"

const isMock = process.env.NEXT_PUBLIC_MOCK === "true"
const API_BASE = isMock
  ? "/api"
  : process.env.NEXT_PUBLIC_PROXMOX_API || ""

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...init,
  })

  if (!res.ok) {
    throw new Error(res.statusText)
  }

  return res.json() as Promise<T>
}

export const listNodes = () =>
  queryOptions({
    queryKey: ["proxmox", "nodes"],
    queryFn: () => apiFetch<ProxmoxNode[]>("/nodes"),
  })

export const listVMs = (node: string) =>
  queryOptions({
    queryKey: ["proxmox", "nodes", node, "vms"],
    queryFn: () => apiFetch<ProxmoxVM[]>(`/nodes/${node}/vms`),
    enabled: !!node,
  })

export const getVM = (node: string, id: number) =>
  queryOptions({
    queryKey: ["proxmox", "nodes", node, "vms", id],
    queryFn: () => apiFetch<ProxmoxVM>(`/nodes/${node}/vms/${id}`),
    enabled: !!node && !!id,
  })

export const createVM = () =>
  mutationOptions({
    mutationFn: (data: Partial<ProxmoxVM>) =>
      apiFetch<ProxmoxVM>(`/vms`, {
        method: "POST",
        body: JSON.stringify(data),
      }),
  })

export const deleteVM = (node: string, id: number) =>
  mutationOptions({
    mutationFn: () =>
      apiFetch<void>(`/nodes/${node}/vms/${id}`, { method: "DELETE" }),
  })

export const startVM = (node: string, id: number) =>
  mutationOptions({
    mutationFn: () =>
      apiFetch<void>(`/nodes/${node}/vms/${id}/status/start`, {
        method: "POST",
      }),
  })

export const stopVM = (node: string, id: number) =>
  mutationOptions({
    mutationFn: () =>
      apiFetch<void>(`/nodes/${node}/vms/${id}/status/stop`, {
        method: "POST",
      }),
  })

export const rebootVM = (node: string, id: number) =>
  mutationOptions({
    mutationFn: () =>
      apiFetch<void>(`/nodes/${node}/vms/${id}/status/reboot`, {
        method: "POST",
      }),
  })

export const cloneVM = (node: string, id: number) =>
  mutationOptions({
    mutationFn: (data: Partial<ProxmoxVM>) =>
      apiFetch<ProxmoxVM>(`/nodes/${node}/vms/${id}/clone`, {
        method: "POST",
        body: JSON.stringify(data),
      }),
  })

export const updateResources = (node: string, id: number) =>
  mutationOptions({
    mutationFn: (data: Record<string, unknown>) =>
      apiFetch<ProxmoxVM>(`/nodes/${node}/vms/${id}/config`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
  })

export const setNetwork = (node: string, id: number) =>
  mutationOptions({
    mutationFn: (data: Record<string, unknown>) =>
      apiFetch<void>(`/nodes/${node}/vms/${id}/network`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
  })

export const listSnapshots = (node: string, id: number) =>
  queryOptions({
    queryKey: ["proxmox", "nodes", node, "vms", id, "snapshots"],
    queryFn: () =>
      apiFetch<ProxmoxSnapshot[]>(`/nodes/${node}/vms/${id}/snapshots`),
    enabled: !!node && !!id,
  })

export const createSnapshot = (node: string, id: number) =>
  mutationOptions({
    mutationFn: (data: Partial<ProxmoxSnapshot>) =>
      apiFetch<ProxmoxSnapshot>(`/nodes/${node}/vms/${id}/snapshots`, {
        method: "POST",
        body: JSON.stringify(data),
      }),
  })

export const deleteSnapshot = (node: string, id: number, snap: string) =>
  mutationOptions({
    mutationFn: () =>
      apiFetch<void>(`/nodes/${node}/vms/${id}/snapshots/${snap}`, {
        method: "DELETE",
      }),
  })

export const rollbackSnapshot = (node: string, id: number, snap: string) =>
  mutationOptions({
    mutationFn: () =>
      apiFetch<void>(`/nodes/${node}/vms/${id}/snapshots/${snap}/rollback`, {
        method: "POST",
      }),
  })

export const setCloudInit = (node: string, id: number) =>
  mutationOptions({
    mutationFn: (data: Record<string, unknown>) =>
      apiFetch<void>(`/nodes/${node}/vms/${id}/cloudinit`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
  })

export const listTemplates = () =>
  queryOptions({
    queryKey: ["proxmox", "templates"],
    queryFn: () => apiFetch<ProxmoxVM[]>("/templates"),
  })

export const listImages = () =>
  queryOptions({
    queryKey: ["proxmox", "images"],
    queryFn: () => apiFetch<string[]>("/images"),
  })
