import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import M01Cultura from '@/components/modules/M01Cultura';
import M02CicloVida from '@/components/modules/M02CicloVida';
import M03Tipos from '@/components/modules/M03Tipos';
import M04Gobernanza from '@/components/modules/M04Gobernanza';
import M05Calidad from '@/components/modules/M05Calidad';
import M06Visualizacion from '@/components/modules/M06Visualizacion';
import M07KPIs from '@/components/modules/M07KPIs';
import M08Nubes from '@/components/modules/M08Nubes';
import M09IA from '@/components/modules/M09IA';
import M10Glosario from '@/components/modules/M10Glosario';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="relative">
      <Nav />
      <div className="xl:pl-64">
        <Hero />
        <M01Cultura />
        <M02CicloVida />
        <M03Tipos />
        <M04Gobernanza />
        <M05Calidad />
        <M06Visualizacion />
        <M07KPIs />
        <M08Nubes />
        <M09IA />
        <M10Glosario />
        <Footer />
      </div>
    </main>
  );
}
