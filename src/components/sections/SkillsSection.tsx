export default function SkillsSection() {
  const categories = [
    {
      title: "Backend & Arquitetura",
      techs: ["Java", "Spring Boot", "Microsserviços", "APIs RESTful", "Spring Data JPA", "SOLID", "Clean Architecture", "Design Patterns", "POO"]
    },
    {
      title: "Frontend",
      techs: ["Angular", "TypeScript", "HTML", "CSS/SCSS", "JavaScript"]
    },
    {
      title: "Banco de Dados & Dados",
      techs: ["SQL Server", "MySQL", "PostgreSQL", "MongoDB", "Otimização de Consultas", "Versionamento estruturado com Flyway"]
    },
    {
      title: "Segurança & Mensageria",
      techs: ["Spring Security", "JWT", "OAuth 2.0", "Apache Kafka"]
    },
    {
      title: "DevOps & Qualidade",
      techs: ["Docker", "CI/CD", "Git", "GitLab", "GitHub", "Maven", "Gradle", "JUnit 5", "Mockito (Testes Unitários)", "Swagger (OpenAPI)", "Postman/Insomnia"]
    },
    {
      title: "Produtividade & IA",
      techs: ["Context Engineering", "Uso de LLMs avançados para refatoração", "Automação de código"]
    }
  ];

  return (
    <section id="habilidades" className="relative h-screen w-full flex items-center justify-start bg-[#aaa39c] overflow-hidden px-[2vw] md:px-[4vw]">
      {/* Sombra em degradê do preto (#0a0b0d) em ambas as laterais para a cor atual (#aaa39c) */}
      <div
        className="absolute inset-y-0 left-0 w-[45vw] pointer-events-none bg-gradient-to-r from-[#0a0b0d] via-[#0a0b0d]/70 to-transparent z-20"
        aria-hidden="true"
      />
      <div
        className="absolute inset-y-0 right-0 w-[25vw] pointer-events-none bg-gradient-to-l from-[#0a0b0d] via-[#0a0b0d]/50 to-transparent z-20"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-30 max-w-5xl w-full mx-auto md:mx-0 flex flex-col justify-center h-full pt-16">
        <div className="mb-6">
          <p className="font-michroma text-[10px] md:text-sm tracking-[0.5em] uppercase mb-2 text-[#00ff88] animate-pulse">
            Expertise
          </p>
          <h2 className="font-michroma text-2xl md:text-4xl lg:text-5xl mb-4 leading-tight text-white select-none">
            HABILIDADES <br /> <span className="text-white/50">&amp; TECH STACK</span>
          </h2>
          <div className="h-[1px] w-24 bg-[#00ff88]/40 hidden lg:block"></div>
        </div>

        {/* Grid of stacks */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-h-[70vh] overflow-y-auto pr-2 select-none">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="bg-black/40 backdrop-blur-md border border-white/5 hover:border-[#00ff88]/30 transition-all duration-500 p-5 rounded-sm flex flex-col justify-start"
            >
              <h3 className="font-michroma text-[11px] md:text-[12px] text-[#00ff88] uppercase tracking-widest mb-3">
                {cat.title}
              </h3>
              <p className="text-gray-300 text-[11px] md:text-xs leading-relaxed font-sans">
                {cat.techs.map((tech, tIdx) => {
                  const isMain = [
                    "Java", "Spring Boot", "TypeScript", "Angular", "Docker", "SQL Server", 
                    "Spring Security", "Apache Kafka", "Clean Architecture", "Microsserviços", 
                    "SOLID", "Uso de LLMs avançados para refatoração", "Context Engineering"
                  ].includes(tech);
                  return (
                    <span key={tIdx}>
                      <span className={isMain ? "text-white font-medium" : ""}>{tech}</span>
                      {tIdx < cat.techs.length - 1 ? ", " : ""}
                    </span>
                  );
                })}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
