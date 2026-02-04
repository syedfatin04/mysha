"use client"

import { useEffect, useRef, useState } from "react"
import * as d3 from "d3"
import * as topojson from "topojson-client"

interface RotatingEarthProps {
  width?: number
  height?: number
  className?: string
}

export default function RotatingEarth({ width = 800, height = 600, className = "" }: RotatingEarthProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const context = canvas.getContext("2d")
    if (!context) return

    // Set canvas size
    canvas.width = width
    canvas.height = height

    const containerWidth = width
    const containerHeight = height
    const radius = Math.min(containerWidth, containerHeight) / 2

    // Create projection
    const projection = d3
      .geoOrthographic()
      .scale(radius)
      .translate([containerWidth / 2, containerHeight / 2])
      .clipAngle(90)

    const path = d3.geoPath(projection, context)

    let rotation: [number, number] = [0, 0]
    let isDragging = false
    let previousMousePosition = { x: 0, y: 0 }
    let renderTimeout: NodeJS.Timeout | null = null
    let landFeatures: any

    const render = () => {
      // Draw ocean (transparent background)
      context.clearRect(0, 0, containerWidth, containerHeight)

      const currentScale = projection.scale()
      const scaleFactor = currentScale / radius

      // Draw only the graticule and land, no solid background
      if (landFeatures) {
        // Draw graticule
        const graticule = d3.geoGraticule()
        context.beginPath()
        path(graticule())
        context.strokeStyle = "#ffffff"
        context.lineWidth = 1 * scaleFactor
        context.globalAlpha = 0.25
        context.stroke()
        context.globalAlpha = 1

        // Draw land outlines
        context.beginPath()
        landFeatures.features.forEach((feature: any) => {
          path(feature)
        })
        context.strokeStyle = "#ffffff"
        context.lineWidth = 1 * scaleFactor
        context.stroke()
      }
    }

    // Load world data
    d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json").then((world: any) => {
      landFeatures = topojson.feature(world, world.objects.land)
      render()
      setIsLoading(false)
    }).catch((err: any) => {
      setError("Failed to load land map data")
      setIsLoading(false)
    })

    // Mouse event handlers with performance optimization
    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true
      previousMousePosition = { x: e.clientX, y: e.clientY }
      canvas.style.cursor = "grabbing"
      e.preventDefault()
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return

      const deltaX = e.clientX - previousMousePosition.x
      const deltaY = e.clientY - previousMousePosition.y

      rotation[0] = rotation[0] + deltaX * 0.2 // Further reduced sensitivity
      rotation[1] = Math.max(-90, Math.min(90, rotation[1] - deltaY * 0.2))

      projection.rotate(rotation)
      
      // Immediate render for better responsiveness during drag
      render()

      previousMousePosition = { x: e.clientX, y: e.clientY }
      e.preventDefault()
    }

    const handleMouseUp = () => {
      isDragging = false
      canvas.style.cursor = "grab"
      // Clear any pending render timeout
      if (renderTimeout) {
        clearTimeout(renderTimeout)
        renderTimeout = null
      }
    }

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      e.stopPropagation()
      // Disable zooming - do nothing
    }

    // Touch event handlers
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY }
        e.preventDefault()
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return

      const deltaX = e.touches[0].clientX - previousMousePosition.x
      const deltaY = e.touches[0].clientY - previousMousePosition.y

      rotation[0] = rotation[0] + deltaX * 0.2
      rotation[1] = Math.max(-90, Math.min(90, rotation[1] - deltaY * 0.2))

      projection.rotate(rotation)
      
      // Immediate render for better responsiveness during drag
      render()

      previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY }
      e.preventDefault()
    }

    const handleTouchEnd = () => {
      isDragging = false
      if (renderTimeout) {
        clearTimeout(renderTimeout)
        renderTimeout = null
      }
    }

    // Add event listeners
    canvas.addEventListener("mousedown", handleMouseDown)
    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("mouseup", handleMouseUp)
    canvas.addEventListener("mouseleave", handleMouseUp)
    canvas.addEventListener("wheel", handleWheel, { passive: false })
    canvas.addEventListener("touchstart", handleTouchStart)
    canvas.addEventListener("touchmove", handleTouchMove)
    canvas.addEventListener("touchend", handleTouchEnd)

    // Set initial cursor
    canvas.style.cursor = "grab"

    // Auto-rotation (disabled during drag)
    let animationFrameId: number
    const autoRotate = () => {
      if (!isDragging) {
        rotation[0] = rotation[0] + 0.1 // Slower auto-rotation
        projection.rotate(rotation)
        render()
      }
      animationFrameId = requestAnimationFrame(autoRotate)
    }
    animationFrameId = requestAnimationFrame(autoRotate)

    // Cleanup
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
      canvas.removeEventListener("mousedown", handleMouseDown)
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("mouseup", handleMouseUp)
      canvas.removeEventListener("mouseleave", handleMouseUp)
      canvas.removeEventListener("wheel", handleWheel)
      canvas.removeEventListener("touchstart", handleTouchStart)
      canvas.removeEventListener("touchmove", handleTouchMove)
      canvas.removeEventListener("touchend", handleTouchEnd)
      if (renderTimeout) {
        clearTimeout(renderTimeout)
      }
    }
  }, [width, height])

  if (error) {
    return (
      <div className={`dark flex items-center justify-center bg-card rounded-2xl p-8 ${className}`}>
        <div className="text-center">
          <p className="dark text-destructive font-semibold mb-2">Error loading Earth visualization</p>
          <p className="dark text-muted-foreground text-sm">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-auto rounded-2xl"
        style={{ maxWidth: "100%", height: "auto" }}
      />
    </div>
  )
}
