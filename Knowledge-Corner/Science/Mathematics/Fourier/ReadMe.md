# Fourier Transform

The **Fourier Transform** is a mathematical operation that transforms a time-domain signal into its frequency-domain representation. It decomposes a function or signal into its constituent frequencies, allowing for the analysis of its spectral components.

## Mathematical Definition

Mathematically, for a continuous function $\( f(t) \)$, the Fourier Transform $\( F(\omega) \)$ is defined as:

$ F(\omega) = \int_{-\infty}^{\infty} f(t) e^{-i \omega t} dt $

where:

- $\( \omega \)$ represents angular frequency
- $\( i \)$ is the imaginary unit

## Applications

The inverse Fourier Transform reconstructs the original signal from its frequency components, enabling applications in signal processing, communications, and many areas of engineering and physics.

## Rectangular Signal Representation

A rectangular signal can be expressed as a **sum** of **sinusoidal** functions using its Fourier series representation. The Fourier series decomposes a periodic rectangular waveform into a series of sine and cosine functions.

### Mathematical Representation

For a rectangular signal with a period \( T \) and amplitude \( A \), defined over the interval $\( [-T/2, T/2] \)$, the Fourier series representation can be expressed as follows:

$ f(t) = \frac{A}{2} + \sum_{n=1}^{\infty} \frac{A}{n \pi} \sin\left(\frac{2 \pi n t}{T}\right)$

#### Components

- $\( \frac{A}{2} \)$: Average (DC) component of the signal.
- $\( \frac{A}{n \pi} \)$: Amplitude of the nth harmonic.
- $\( \sin\left(\frac{2 \pi n t}{T}\right) \)$: Sinusoidal functions representing the harmonics.

### Example

For a rectangular signal with period $\( T = 2 \)$ and amplitude $\( A = 1 \)$:

$ f(t) = \frac{1}{2} + \sum_{n=1}^{\infty} \frac{1}{n \pi} \sin\left(n \pi t\right) $

This representation shows that the rectangular signal can be approximated as an infinite series of sine waves with decreasing amplitudes at odd harmonics (1st, 3rd, 5th, etc.).

### Visualization

In practice, this means that if you plot the sum of the first few terms of this series, you will approximate the rectangular waveform closely. The more terms you include, the closer the approximation to the actual rectangular signal.
