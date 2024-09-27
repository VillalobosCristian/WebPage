### P1. Considere la Ecuación de Chapman-Kolmogorov (ECK)

$$
\frac{\partial}{\partial t} p(y, t|y_0, t_0) = \lim_{\Delta t \to 0} \frac{1}{\Delta t} \left[ \int_\Omega dy' \, p(y, t + \Delta t|y', t)p(y', t|y_0, t_0) - \int_\Omega dy' \, p(y', t + \Delta t|y, t)p(y, t|y_0, t_0) \right]
$$

Derive la expresión para la expansión de Kramers-Moyal:

$$
\frac{\partial}{\partial t} p(y, t|y_0, t_0) = \sum_{m=1}^{\infty} \frac{(-1)^m}{m!} \frac{\partial^m}{\partial y^m} \left[D_m(y, t)p(y, t)\right]
$$

(Note que aquí se pueden omitir los argumentos $y_0$ y $t_0$), donde

$$
D_m(y', t) = \lim_{\Delta t \to 0} \frac{1}{\Delta t} \int_\Omega dy (y - y')^m p(y, t + \Delta t|y', t)
$$

**Sugerencia:**

1. Multiplique la ECK por una función auxiliar cualquiera $\phi(y) : \Omega \to \mathbb{R}$.
2. Integre con respecto a $y$ sobre todo $\Omega$.
3. En el primer término, expanda $\phi(y)$ en Taylor en torno a $y'$.
4. Note que en el segundo término puede intercambiar $y \leftrightarrow y'$.
5. Aplique la integración por partes generalizada

$$
\int_\Omega dx \, \frac{\partial^m f}{\partial x^m} g = \sum_{k=0}^{m-1} (-1)^k \frac{\partial^k g}{\partial x^k} \frac{\partial^{m-1-k} f}{\partial x^{m-1-k}} \Bigg|_{\partial \Omega} + (-1)^m \int_\Omega dx \, f \frac{\partial^m g}{\partial x^m}
$$

notando que los términos de la sumatoria (términos de contorno) se anulan todos si asumimos que el proceso estocástico está contenido en $\Omega$ (i.e., $p(y, t)$ y sus $m$ derivadas se anulan en $\partial \Omega$).


# Solución



La ecuación Chapman-Kolmogorov es:

$$
\frac{\partial}{\partial t} p(y, t|y_0, t_0) = \lim_{\Delta t \to 0} \frac{1}{\Delta t} \left[ \int_\Omega dy' \, p(y, t + \Delta t|y', t)p(y', t|y_0, t_0) - p(y, t|y_0, t_0) \right]
$$

Siguendo las indicaciones, introducimos una función suave de prueba $\phi(y)$, multiplicamos ambos lados por $\phi(y)$ e integramos sobre $y$

$$
\int_\Omega dy \, \phi(y) \frac{\partial}{\partial t} p(y, t|y_0, t_0) = \lim_{\Delta t \to 0} \frac{1}{\Delta t} \left[ \int_\Omega dy \, \phi(y) \int_\Omega dy' \, p(y, t + \Delta t|y', t) p(y', t|y_0, t_0) - \int_\Omega dy \, \phi(y) p(y, t|y_0, t_0) \right]
$$



Cambiamos el orden de integración en la integral doble

$$
\int_\Omega dy \, \phi(y) \frac{\partial}{\partial t} p(y, t|y_0, t_0) = \lim_{\Delta t \to 0} \frac{1}{\Delta t} \left[ \int_\Omega dy' \, p(y', t|y_0, t_0) \int_\Omega dy \, \phi(y) p(y, t + \Delta t|y', t) - \int_\Omega dy \, \phi(y) p(y, t|y_0, t_0) \right]
$$



Y expandimos en Taylor la función de prueba:

$$
\phi(y) = \phi(y') + \sum_{m=1}^{\infty} \frac{(y - y')^m}{m!} \frac{\partial^m \phi(y')}{\partial y'^m}
$$

Substituimos

$$
\int_\Omega dy \, \phi(y) \frac{\partial}{\partial t} p(y, t|y_0, t_0) = \lim_{\Delta t \to 0} \frac{1}{\Delta t} \left[ \int_\Omega dy' \, p(y', t|y_0, t_0) \int_\Omega dy \left(\phi(y') + \sum_{m=1}^{\infty} \frac{(y - y')^m}{m!} \frac{\partial^m \phi(y')}{\partial y'^m}\right) p(y, t + \Delta t|y', t) - \int_\Omega dy \, \phi(y) p(y, t|y_0, t_0) \right]
$$
$$\begin{aligned}
\int_\Omega dy \, \phi(y) \frac{\partial}{\partial t} p(y, t|y_0, t_0) = \lim_{\Delta t \to 0} \frac{1}{\Delta t} \bigg[ &\int_\Omega dy' \, p(y', t|y_0, t_0) \int_\Omega dy \, \phi(y') p(y, t + \Delta t|y', t) \\
&+ \int_\Omega dy' \, p(y', t|y_0, t_0) \sum_{m=1}^{\infty} \frac{1}{m!} \frac{\partial^m \phi(y')}{\partial y'^m} \int_\Omega dy \, (y - y')^m p(y, t + \Delta t|y', t) \\
&- \int_\Omega dy \, \phi(y) p(y, t|y_0, t_0) \bigg]
\end{aligned}$$

Primero, observemos que la densidad de probabilidad $p(y, t + \Delta t|y', t)$ está normalizada:

$$
\int_\Omega dy \, p(y, t + \Delta t|y', t) = 1
$$

Por lo tanto, el primer término se simplifica a:

$$
\int_\Omega dy \, \phi(y') p(y, t + \Delta t|y', t) = \phi(y')
$$

Esto nos lleva a:

$$
\int_\Omega dy \, \phi(y) \frac{\partial}{\partial t} p(y, t|y_0, t_0) = \lim_{\Delta t \to 0} \frac{1}{\Delta t} \left[ \int_\Omega dy' \, p(y', t|y_0, t_0) \sum_{m=1}^{\infty} \frac{1}{m!} \frac{\partial^m \phi(y')}{\partial y'^m} \int_\Omega dy \, (y - y')^m p(y, t + \Delta t|y', t) \right]
$$

Definimos los coeficientes de Kramers-Moyal $D_m(y', t)$ como:

$$
D_m(y', t) = \lim_{\Delta t \to 0} \frac{1}{\Delta t} \int_\Omega dy \, (y - y')^m p(y, t + \Delta t|y', t)
$$

Sustituyendo estos en la ecuación, obtenemos:

$$
\int_\Omega dy \, \phi(y) \frac{\partial}{\partial t} p(y, t|y_0, t_0) = \sum_{m=1}^{\infty} \frac{1}{m!} \int_\Omega dy' \, p(y', t|y_0, t_0) \frac{\partial^m \phi(y')}{\partial y'^m} D_m(y', t)
$$



Ahora, aplicamos la integración por partes $m$ veces en el lado derecho:

$$
\int_\Omega dy' \, p(y', t|y_0, t_0) \frac{\partial^m \phi(y')}{\partial y'^m} D_m(y', t) = (-1)^m \int_\Omega dy' \, \phi(y') \frac{\partial^m}{\partial y'^m} \left[D_m(y', t) p(y', t|y_0, t_0)\right]
$$


#### Primera integración por partes

Sea:

- $u(y') = p(y', t|y_0, t_0) D_m(y', t)$
- $v(y') = \frac{\partial^{m-1} \phi(y')}{\partial y'^{m-1}}$

Entonces:

$$
\int_\Omega dy' \, u(y') \frac{d}{dy'} v(y') = \left[ u(y')v(y') \right]_{\text{boundary}} - \int_\Omega dy' \, v(y') \frac{d}{dy'} u(y')
$$

Esto da:

$$
\int_\Omega dy' \, p(y', t|y_0, t_0) \frac{\partial^m \phi(y')}{\partial y'^m} D_m(y', t) = \left[ p(y', t|y_0, t_0) D_m(y', t) \frac{\partial^{m-1} \phi(y')}{\partial y'^{m-1}} \right]_{\text{boundary}} - \int_\Omega dy' \, \frac{\partial^{m-1} \phi(y')}{\partial y'^{m-1}} \frac{\partial}{\partial y'}\left[p(y', t|y_0, t_0) D_m(y', t)\right]
$$

#### Segunda integración por partes

Aplicamos la integración por partes nuevamente:

- $u(y') = \frac{\partial}{\partial y'}\left[p(y', t|y_0, t_0) D_m(y', t)\right]$
- $v(y') = \frac{\partial^{m-2} \phi(y')}{\partial y'^{m-2}}$

Entonces:

$$
\int_\Omega dy' \, \frac{\partial^{m-1} \phi(y')}{\partial y'^{m-1}} \frac{\partial}{\partial y'}\left[p(y', t|y_0, t_0) D_m(y', t)\right] = \left[ \frac{\partial^{m-1} \phi(y')}{\partial y'^{m-1}} \frac{\partial^{m-2}}{\partial y'^{m-2}}\left[p(y', t|y_0, t_0) D_m(y', t)\right] \right]_{\text{boundary}} - \int_\Omega dy' \, \frac{\partial^{m-2} \phi(y')}{\partial y'^{m-2}} \frac{\partial^2}{\partial y'^2}\left[p(y', t|y_0, t_0) D_m(y', t)\right]
$$

#### Continuar por $m$ iteraciones

Después de $m$ iteraciones, obtenemos:

$$
\int_\Omega dy' \, p(y', t|y_0, t_0) \frac{\partial^m \phi(y')}{\partial y'^m} D_m(y', t) = (-1)^m \int_\Omega dy' \, \phi(y') \frac{\partial^m}{\partial y'^m} \left[D_m(y', t) p(y', t|y_0, t_0)\right]
$$



Cada integración por partes genera un término de borde

$$
\left[ \frac{\partial^{n-1}}{\partial y'^{n-1}} \left( p(y', t|y_0, t_0) D_m(y', t) \right) \frac{\partial^{m-n} \phi(y')}{\partial y'^{m-n}} \right]_{\text{boundary}}
$$

Asumiendo que los términos de contorno se anulan, nos quedamos con la forma integral.



Dado que $\phi(y)$ es una función de prueba arbitraria, podemos igualar los integrandos para obtener la expansión de Kramers-Moyal:

$$
\frac{\partial}{\partial t} p(y, t|y_0, t_0) = \sum_{m=1}^{\infty} \frac{(-1)^m}{m!} \frac{\partial^m}{\partial y^m} \left[D_m(y, t)p(y, t|y_0, t_0)\right]
$$

---
### P2. La ecuación de difusión para el movimiento Browniano en 1D es:

$$
\frac{\partial p(x, t)}{\partial t} = D \frac{\partial^2 p(x, t)}{\partial x^2}
$$

donde $p(x, t)$ es la función densidad de probabilidad que describe la probabilidad de encontrar a la partícula Browniana en la posición $x$ al tiempo $t$, y $D$ es la constante de difusión.

### 1. Solución general usando la Transformada de Fourier

 La Transformada de Fourier. La transformada de Fourier de $p(x, t)$ se define como:

$$
\tilde{p}(k, t) = \int_{-\infty}^{\infty} p(x, t) e^{-ikx} \, dx
$$

Aplicando la Transformada de Fourier a la ecuación de difusión:

$$
\frac{\partial \tilde{p}(k, t)}{\partial t} = D \frac{\partial^2}{\partial x^2} \int_{-\infty}^{\infty} p(x, t) e^{-ikx} \, dx
$$

Dado que la derivada espacial se convierte en un factor multiplicativo en el dominio de Fourier:

$$
\frac{\partial \tilde{p}(k, t)}{\partial t} = -Dk^2 \tilde{p}(k, t)
$$

Esta es una ecuación diferencial ordinaria en $t$ que podemos resolver:

$$
\tilde{p}(k, t) = \tilde{p}(k, 0) e^{-Dk^2t}
$$

Donde $\tilde{p}(k, 0)$ es la transformada de Fourier de la condición inicial $p(x, 0)$.

### Condición inicial: $p(x, 0) = \delta(x - x_0)$

Dado que la condición inicial es una delta de Dirac $p(x, 0) = \delta(x - x_0)$, su transformada de Fourier es:

$$
\tilde{p}(k, 0) = e^{-ikx_0}
$$

Por lo tanto, la solución en el dominio de Fourier es:

$$
\tilde{p}(k, t) = e^{-ikx_0} e^{-Dk^2t} = e^{-ikx_0 - Dk^2t}
$$

Para encontrar $p(x, t)$ en el dominio espacial, aplicamos la transformada inversa de Fourier:

$$
p(x, t) = \frac{1}{2\pi} \int_{-\infty}^{\infty} \tilde{p}(k, t) e^{ikx} \, dk
$$

Sustituyendo $\tilde{p}(k, t)$:

$$
p(x, t) = \frac{1}{2\pi} \int_{-\infty}^{\infty} e^{-ikx_0 - Dk^2t} e^{ikx} \, dk = \frac{1}{2\pi} \int_{-\infty}^{\infty} e^{-Dk^2t} e^{ik(x-x_0)} \, dk
$$

Esta es la integral de Fourier de una función gaussiana. La solución de esta integral es:

$$
p(x, t) = \frac{1}{\sqrt{4\pi Dt}} e^{-\frac{(x - x_0)^2}{4Dt}}
$$


###  Condiciones de borde en infinito

En este caso, se pide que:

$$
\lim_{x \to \pm \infty} p(x, t) = 0
$$

La solución que hemos obtenido satisface estas condiciones de borde, ya que:

$$
\lim_{x \to \pm \infty} \frac{1}{\sqrt{4\pi Dt}} e^{-\frac{(x - x_0)^2}{4Dt}} = 0
$$

Esto es debido a la exponencial gaussiana que tiende a cero cuando $x$ tiende a $\pm \infty$.

### 5. Condiciones de borde reflectantes

Para resolver el problema con condiciones de borde reflectantes, tenemos:

$$
p\left(-\frac{L}{2}, t\right) = p\left(\frac{L}{2}, t\right)
$$

$$
-D \frac{\partial p}{\partial x} \Bigg|_{x = \pm \frac{L}{2}} = 0
$$

Para aplicar estas condiciones, necesitamos considerar la solución en un dominio finito con $L$ como el tamaño del dominio. En este caso, la solución puede representarse como una serie de Fourier debido a la naturaleza periódica de las condiciones de borde reflectantes.
Proponemos una solución en forma de serie de Fourier:

$$
p(x, t) = \sum_{n=-\infty}^{\infty} c_n(t) e^{i \frac{2\pi n}{L} x}
$$

Las condiciones de borde se traducen en condiciones sobre los coeficientes de Fourier $c_n(t)$. La ecuación de difusión en este caso se convierte en una ecuación diferencial para cada $c_n(t)$:

$$
\frac{\partial c_n(t)}{\partial t} = -D \left(\frac{2\pi n}{L}\right)^2 c_n(t)
$$

La solución es:

$$
c_n(t) = c_n(0) e^{-D \left(\frac{2\pi n}{L}\right)^2 t}
$$

Los coeficientes $c_n(0)$ se determinan a partir de la condición inicial $p(x, 0)$ usando la transformada inversa de Fourier:

$$
c_n(0) = \frac{1}{L} \int_{-L/2}^{L/2} p(x, 0) e^{-i \frac{2\pi n}{L} x} \, dx
$$

Para la condición inicial delta de Dirac $p(x, 0) = \delta(x - x_0)$, tenemos:

$$
c_n(0) = \frac{1}{L} e^{-i \frac{2\pi n}{L} x_0}
$$

Por lo tanto, la solución es:

$$
p(x, t) = \frac{1}{L} \sum_{n=-\infty}^{\infty} e^{-D \left(\frac{2\pi n}{L}\right)^2 t} e^{i \frac{2\pi n}{L} (x - x_0)}
$$

Esta solución satisface las condiciones de borde reflectantes.

# P3
Utilizando su lenguaje de programación preferido:

**(a)** Escriba un programa que simule el movimiento Browniano de una partícula en 1D. La trayectoria puede ser generada por medio del método de Euler-Maruyama:

$$
x_{k+1} = x_k + \sqrt{2D\Delta t} \eta_k
$$

donde $x_k$ es la posición de la partícula en el tiempo $t = k\Delta t$, $x_{k+1}$ es la posición de la partícula en el tiempo $t + \Delta t$, con intervalo de tiempo $\Delta t$ pequeño, y $\eta_k$ es un número aleatorio obtenido a cada paso de tiempo de una distribución normal centrada en cero y con varianza 1, $N(0, 1)$.

**(b)** Genere un gran número de trayectorias y estime la distribución $p(x, t)$ a distintos tiempos.

**(c)** Compare sus resultados numéricos con la solución analítica de la ecuación de difusión.

**(d)** Repita el experimento numérico para ambas condiciones de borde propuestas en P2.

**(e)** Explore los parámetros de su simulación y pruebe las condiciones bajo las cuales la solución analítica reproduce de manera precisa los resultados numéricos.


Tamaño dominio $L=10$, $D=1$, $x_0=0$
![Simulación del Movimiento Browniano](simulacion_movimiento_browniano_completo%201.svg)
