## Conceptos Básicos
- **Flujo laminar:** Régimen de flujo donde las partículas del fluido se mueven en capas paralelas sin mezclarse.
- **Número de Reynolds (Re):** Parámetro adimensional que caracteriza el tipo de flujo (laminar o turbulento). $Re = \frac{\rho u L}{\mu}$.
- **Capa límite:** Región delgada cerca de una superficie donde los efectos viscosos son significativos.
- **Estabilidad:** Propiedad de un flujo que determina si pequeñas perturbaciones crecerán o se disiparán con el tiempo.

## Flujo Potential Y Flujo Irrotacional
El flujo potential es un tipo de flujo irrotacional donde la velocidad del fluido puede derivarse de un potential escalar $\phi$, tal que $\mathbf{u} = \nabla \phi$. Este flujo cumple con la ecuación de Laplace:
\[
\nabla^2 \phi = 0
\]

### Algunos Resultados
- **Flujo alrededor de una esfera:**
  \[
  \phi = -\frac{U R^3}{2r^2} \cos \theta + U r \cos \theta
  \]
  donde $U$ es la velocidad a infinito, $R$ es el radio de la esfera, $r$ es la distancia radial y $\theta$ es el ángulo polar.
- **Flujo alrededor de un cono:**
  \[
  \phi = -\frac{U}{k} \ln \left( \frac{r}{R} \right) \cos \theta
  \]

### Ecuación De Evolución De la Vorticidad
La vorticidad $\boldsymbol{\omega}$ está definida como $\boldsymbol{\omega} = \nabla \times \mathbf{u}$. La ecuación de evolución para la vorticidad en fluidos de Euler es:
\[
\frac{D\boldsymbol{\omega}}{Dt} = (\boldsymbol{\omega} \cdot \nabla)\mathbf{u} - (\nabla \cdot \mathbf{u})\boldsymbol{\omega}
\]

### Ecuación De Evolución De la Temperatura
Para un fluido ideal con conducción de calor, la ecuación de evolución de la temperatura $T$ es:
\[
\frac{\partial T}{\partial t} + (\mathbf{u} \cdot \nabla)T = \kappa \nabla^2 T
\]
donde $\kappa$ es el coeficiente de difusión térmica.

## Flujos Viscosos Y Capa Límite
### Ecuaciones De Navier-Stokes Para Flujos Viscosos
Las ecuaciones de Navier-Stokes para un fluido viscoso e incompresible son:
\[
\nabla \cdot \mathbf{u} = 0
\]
\[
\frac{\partial \mathbf{u}}{\partial t} + (\mathbf{u} \cdot \nabla)\mathbf{u} = -\nabla p + \nu \nabla^2 \mathbf{u}
\]

### Soluciones Analíticas Para Flujos Laminares
- **Flujo de Poiseuille:**
  \[
  u(r) = \frac{\Delta P}{4\mu L}(R^2 - r^2)
  \]
  ![[Resumen Control 3 2024-06-11 19.49.14.excalidraw]]
- **Flujo de Couette:![[Drawing 2024-06-11 19.52.25.excalidraw.svg|400]]
  \[
  u(y) = U\frac{y}{h}
  \]
- **Flujo de Stokes:**
  \[
  F_D = 6\pi\mu RU
  \]

### Teoría De Capa Límite Y Ecuaciones De Capa Límite
Para flujo laminar incompresible sobre una placa plana, las ecuaciones de capa límite son:
\[
\frac{\partial u}{\partial x} + \frac{\partial v}{\partial y} = 0
\]
\[
u\frac{\partial u}{\partial x} + v\frac{\partial u}{\partial y} = \nu\frac{\partial^2 u}{\partial y^2}
\]

### Soluciones Autosimilares En Capa Límite:
La solución de Blasius utiliza la transformación de similaridad:
\[
\eta = y\sqrt{\frac{U}{\nu x}}, \quad f(\eta) = \frac{\psi}{\sqrt{\nu xU}}
\]

## Flujos Rotacionales Y Flujos Con Superficie Libre
### Flujos Rotacionales En Contenedores Cilíndricos
En un contenedor cilíndrico, el flujo rotacional se describe por:
\[
\mathbf{u} = \Omega \times \mathbf{r}
\]
donde $\Omega$ es la velocidad angular.

### Forma De la Superficie Libre En Un Fluido Incompresible En Rotación
La forma de la superficie libre en un fluido incompresible en rotación viene dada por:
\[
z(r) = \frac{\Omega^2 r^2}{2g}
\]

## Flujos Autosimilares
La autosimilaridad implica que las soluciones de las ecuaciones de Navier-Stokes pueden escalarse de manera que mantengan la misma forma en diferentes instantes de tiempo.

## Flujos De Películas Delgadas
### Ecuación De Evolución Para Películas Delgadas De Fluido Incompresible
La ecuación de evolución para el espesor de una película delgada $h(x,t)$ es:
\[
\frac{\partial h}{\partial t} + \nabla \cdot \left( \frac{h^3}{3\mu} \nabla p \right) = 0
\]

### Efecto De la Tensión Superficial En la Interfase Fluido-aire
La presión capilar $p$ en la interfase es:
\[
p = \sigma \nabla^2 h
\]
donde $\sigma$ es la tensión superficial.

### Ecuación De Lubricación Por Acción De la Gravedad En Planos Inclinados
La ecuación de lubricación para un plano inclinado es:
\[
\frac{\partial h}{\partial t} + \frac{\partial}{\partial x} \left( \frac{\rho g h^3 \sin \alpha}{3\mu} \right) = 0
\]
donde $\alpha$ es el ángulo de inclinación.

## Inestabilidades En Fluidos
### Inestabilidad De Rayleigh-Taylor En Capas De Fluidos De Diferentes Densidades
La inestabilidad de Rayleigh-Taylor ocurre cuando un fluido más denso se encuentra sobre un fluido menos denso en un campo gravitatorio. La frecuencia de crecimiento $\omega$ está dada por:
\[
\omega^2 = \frac{gk(\rho_1 - \rho_2)}{\rho_1 + \rho_2}
\]

### Análisis De Estabilidad Lineal
El análisis de estabilidad lineal para perturbaciones infinitesimales en la interfase se describe mediante la ecuación:
\[
\mathbf{u}(\mathbf{x},t) = \mathbf{U}(\mathbf{x}) + \mathbf{u}'(\mathbf{x},t), \quad \mathbf{u}'(\mathbf{x},t) = \hat{\mathbf{u}}(y)e^{i(\alpha x - \omega t)}
\]
donde $\mathbf{u}'$ es la perturbación, $\hat{\mathbf{u}}$ es la amplitud de la perturbación, $\alpha$ es el número de onda y $\omega$ es la frecuencia.

## Principios Fundamentales
### Conservación De la Masa
La conservación de la masa implica la siguiente relación local entre la densidad $\rho$ y el campo de velocidad $\mathbf{u}$:
\[
\frac{\partial \rho}{\partial t} + \nabla \cdot (\rho \mathbf{u}) = 0
\]
Para un fluido incompresible, donde la densidad es constante, esto se simplifica a la ecuación de continuidad:
\[
\nabla \cdot \mathbf{u} = 0
\]

### Ecuación De Movimiento
La ley de Newton para un medio continuo se expresa como:
\[
\rho \frac{D \mathbf{u}}{D t} = \mathbf{f} + \nabla \cdot \sigma'
\]
donde el derivado convectivo se define como:
\[
\frac{D}{D t} = \frac{\partial}{\partial t} + \mathbf{u} \cdot \nabla
\]

### Fluido Newtoniano
Para un fluido incompresible y newtoniano, la relación constitutiva entre el tensor de esfuerzos de Cauchy $\sigma'$ y el tensor de tasa de deformación $\mathbf{e}$ es lineal:
\[
\sigma' = -p'I + 2\mu \mathbf{e}
\]
donde $\mu$ es la viscosidad dinámica.

### Ecuaciones De Navier-Stokes
Combinando las ecuaciones anteriores, obtenemos las ecuaciones de Navier-Stokes para un fluido incompresible:
\[
\rho \left( \frac{\partial \mathbf{u}}{\partial t} + \mathbf{u} \cdot \nabla \mathbf{u} \right) = -\nabla p + \mu \nabla^2 \mathbf{u} + \mathbf{f}
\]

## Propiedades Generales De Los Flujos De Stokes
### Ecuaciones De Stokes Estacionarias
Para flujos de Stokes estacionarios, donde los términos inerciales pueden despreciarse, las ecuaciones se simplifican a:
\[
\nabla p = \mu \nabla^2 \mathbf{u}
\]

### Teorema Recíproco
El teorema recíproco establece que para dos soluciones $\mathbf{u}^{(1)}$ y $\mathbf{u}^{(2)}$ de las ecuaciones de Stokes en el mismo dominio con las mismas condiciones de contorno:
\[
\int_{\partial D} \left( \mathbf{u}^{(1)} \cdot \sigma^{(2)} \mathbf{n} - \mathbf{u}^{(2)} \cdot \sigma^{(1)} \mathbf{n} \right) dS = 0
\]

## Estabilidad de Flujos Unidireccionales No Viscosos
La relación de dispersión para la inestabilidad de Kelvin-Helmholtz es:
\[
\sigma(k) = -ik \frac{U_1 + U_2}{2} \pm k \frac{U_1 - U_2}{2}
\]

La inestabilidad puede ser estabilizada por:
- Gravedad (para ondas largas): $k < \frac{(\rho_1 + \rho_2)(\rho_2 - \rho_1)}{\rho_1\rho_2}\frac{g}{(U_1 - U_2)^2}$
- Tensión superficial (para ondas cortas): $(U_1 - U_2)^2 < \frac{(\rho_1 + \rho_2)\sqrt{(\rho_2 - \rho_1)g\gamma}}{\rho_1\rho_2}$

---

- Comencemos escribiendo la ley de Laplace en términos de $z(x)$ y sus derivadas. La ley de Laplace establece que la diferencia de presión a través de una interfaz es proporcional a la curvatura media de la interfaz: $p_1 - p_2 = \gamma \kappa$ donde $\kappa$ es la curvatura media, que para una curva en 2D viene dada por: $\kappa = \frac{z''}{(1 + z'^2)^{3/2}}$.
- Ahora, la diferencia de presión a una altura $z$ debajo de la superficie plana es $\rho g z$. Por lo tanto, la ley de Laplace se convierte en: $\rho g z = \gamma \frac{z''}{(1 + z'^2)^{3/2}}$.
- Dividiendo ambos lados por $\gamma$ y reconociendo $a = \sqrt{\gamma/\rho g}$, obtenemos: $\frac{z}{a^2} = \frac{z''}{(1 + z'^2)^{3/2}}$.
- Esta es una ecuación diferencial para $z(x)$. Podemos resolverla multiplicando ambos lados por $z'$ y luego integrando: $\int \frac{z}{a^2} z' dx = \int \frac{z'' z'}{(1 + z'^2)^{3/2}} dx$. El lado izquierdo se integra a $z^2/2a^2$. El lado derecho se puede integrar usando una sustitución $u = z'$, $du = z'' dx$: $\frac{z^2}{2a^2} = -\frac{1}{\sqrt{1 + z'^2}} + C$.
- Lejos de la pared, la superficie se vuelve plana, lo que significa $z' = 0$ cuando $z = 0$. Esto nos permite encontrar la constante de integración $C = -1$. Reorganizando la ecuación:
\[
\frac{1}{\sqrt{1 + z'^2}} = 1 - \frac{z^2}{2a^2}
\]
- En la pared, $z' = \cot \theta$. Sustituyendo esto en la ecuación anterior: $\sin \theta = 1 - \frac{h^2}{2a^2}$ donde $h$ es la altura a la cual sube el líquido en la pared. Resolviendo para $h$: $h = a \sqrt{2(1 - \sin \theta)}$ que es la fórmula deseada.

---
