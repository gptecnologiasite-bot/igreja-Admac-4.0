import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  
  build: {
    // Enable minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
        drop_debugger: true,
      },
    },
    
    // Code splitting configuration
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunk for React and related libraries
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          // UI libraries chunk
          'ui-vendor': ['framer-motion', 'lucide-react'],
          // Charts chunk (if used)
          'charts-vendor': ['recharts'],
        },
        // Optimize chunk file names
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
    
    // Chunk size warnings
    chunkSizeWarningLimit: 1000,
    
    // Enable source maps for debugging (optional, can be disabled for smaller builds)
    sourcemap: false,
    
    // Target modern browsers for smaller bundle size
    target: 'es2015',
    
    // CSS code splitting
    cssCodeSplit: true,
  },
  
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
  
  // Server configuration for development
  server: {
    port: 5173,
    strictPort: false,
    open: false,
  },
  
  // Preview server configuration
  preview: {
    port: 4173,
    strictPort: false,
  },
})
