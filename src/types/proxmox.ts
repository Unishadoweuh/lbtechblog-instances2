export interface ProxmoxNode {
  id: string
  status: string
}

export interface ProxmoxVM {
  id: number
  name: string
  status: string
  node: string
}

export interface ProxmoxSnapshot {
  id: string
  name: string
  created: string
  description?: string
}
