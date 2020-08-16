import * as THREE from 'three'

export default class ContextualObject extends THREE.Group {
  static className = null
  static distributionOptions = {}
  static labels = []
  static baseDensity = 0
  static sizeVariation = 0.5
  static allowUnderwater = false

  constructor(webgl, options) {
    super(options)

    this.type = 'ContextualObject'

    this.webgl = webgl
    this.options = options

    const seedrandom = require('seedrandom')
    this.rng = seedrandom(this.options.seed)
  }

  addMesh(geometry, materialOptions, variation = 0.1) {
    materialOptions.color.r += (this.rng() - 0.5) * variation
    materialOptions.color.g += (this.rng() - 0.5) * variation
    materialOptions.color.b += (this.rng() - 0.5) * variation
    materialOptions.envMap = this.webgl.scene.environment
    if (materialOptions.roughness === undefined) {
      materialOptions.roughness = 0.6
    }
    materialOptions.roughness += (this.rng() - 0.5) * variation

    const material = new THREE.MeshPhysicalMaterial(materialOptions)

    const mesh = new THREE.Mesh(geometry, material)
    mesh.castShadow = true
    mesh.receiveShadow = true
    this.add(mesh)
  }
}