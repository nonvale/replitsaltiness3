export default function GeometricShapes() {
  return (
    <>
      {/* Background Geometric Elements - Shapes Theme Style */}
  <div className="fixed inset-0 pointer-events-none z-[0] overflow-hidden">
        {/* Top Left Area */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-ocean-light geometric-circle opacity-30 float-animation"></div>
        <div className="absolute top-40 left-32 w-16 h-16 bg-ocean-cyan opacity-20 geometric-square"></div>

        {/* Top Right Area */}
        <div className="absolute top-32 right-16 w-24 h-24 bg-sand opacity-40 geometric-circle wave-animation"></div>
        <div className="absolute top-60 right-40 w-12 h-12 bg-ocean-blue opacity-15 geometric-square"></div>

        {/* Middle Left */}
        <div className="absolute top-1/2 left-8 w-20 h-20 bg-ocean-cyan opacity-25 geometric-circle transform -translate-y-1/2 float-animation"></div>
        <div className="absolute top-1/2 left-28 w-8 h-8 bg-ocean-navy opacity-20 geometric-square transform -translate-y-1/2"></div>

        {/* Middle Right */}
        <div className="absolute top-1/2 right-12 w-28 h-28 bg-ocean-light opacity-50 geometric-circle transform -translate-y-1/2 wave-animation"></div>
        <div className="absolute top-1/2 right-36 w-14 h-14 bg-sand opacity-30 geometric-square transform -translate-y-1/2"></div>

        {/* Bottom Left */}
        <div className="absolute bottom-32 left-20 w-18 h-18 bg-ocean-blue opacity-20 geometric-circle float-animation"></div>
        <div className="absolute bottom-48 left-6 w-10 h-10 bg-ocean-cyan opacity-25 geometric-square"></div>

        {/* Bottom Right */}
        <div className="absolute bottom-20 right-24 w-22 h-22 bg-sand opacity-35 geometric-circle wave-animation"></div>
        <div className="absolute bottom-40 right-8 w-16 h-16 bg-ocean-light opacity-40 geometric-square"></div>

        {/* Center scattered elements */}
        <div className="absolute top-1/3 left-1/3 w-6 h-6 bg-ocean-blue opacity-15 geometric-circle"></div>
        <div className="absolute top-2/3 left-2/3 w-8 h-8 bg-ocean-cyan opacity-20 geometric-square"></div>
        <div className="absolute top-1/4 right-1/3 w-4 h-4 bg-sand opacity-25 geometric-circle"></div>
        <div className="absolute bottom-1/3 left-1/2 w-12 h-12 bg-ocean-light opacity-30 geometric-square transform -translate-x-1/2"></div>

        {/* Large background shapes for depth */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-ocean-blue opacity-2 geometric-circle transform -translate-y-48"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-ocean-cyan opacity-3 geometric-square translate-y-40"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-sand opacity-2 geometric-circle transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      {/* Shapes Theme signature gradient overlay */}
  <div className="fixed inset-0 pointer-events-none z-[-1] shapes-hero-overlay"></div>
    </>
  );
}