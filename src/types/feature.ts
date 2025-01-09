export interface Feature {
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
}

export interface FeatureListProps {
  features: Feature[]
}

