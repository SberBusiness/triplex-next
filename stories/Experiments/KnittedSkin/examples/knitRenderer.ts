const VERTEX_SHADER = `
attribute vec2 position;
varying vec2 uv;
void main() {
    uv = position * 0.5 + 0.5;
    gl_Position = vec4(position, 0.0, 1.0);
}`;

const FRAGMENT_SHADER = `
precision highp float;
varying vec2 uv;
uniform sampler2D scene;
uniform sampler2D yarn;
uniform vec2 resolution;
uniform float stitch;
uniform float strength;
uniform vec4 editing;
uniform vec4 componentBounds;
uniform float componentRadius;

void main() {
    vec2 pixel = vec2(uv.x, 1.0 - uv.y) * resolution;
    vec2 halfSize = (componentBounds.zw - componentBounds.xy) * 0.5;
    vec2 centerPixel = (componentBounds.xy + componentBounds.zw) * 0.5;
    vec2 edge = abs(pixel - centerPixel) - halfSize + componentRadius;
    float distance = length(max(edge, 0.0)) + min(max(edge.x, edge.y), 0.0) - componentRadius;
    float coverage = 1.0 - smoothstep(-0.5, 0.5, distance);
    if (coverage <= 0.0) discard;
    if (pixel.x > editing.x && pixel.y > editing.y &&
        pixel.x < editing.z && pixel.y < editing.w) {
        gl_FragColor = vec4(0.0);
        return;
    }
    vec2 cellSize = vec2(stitch, stitch * 1.333333);
    vec2 cell = floor(pixel / cellSize);
    vec2 local = fract(pixel / cellSize);

    float height = texture2D(yarn, local).r;
    float dx = texture2D(yarn, local + vec2(0.012, 0.0)).r - texture2D(yarn, local - vec2(0.012, 0.0)).r;
    float dy = texture2D(yarn, local + vec2(0.0, 0.012)).r - texture2D(yarn, local - vec2(0.0, 0.012)).r;
    vec3 normal = normalize(vec3(-dx * 4.0, -dy * 4.0, 0.7));
    vec3 lightDirection = normalize(vec3(-0.45, -0.6, 1.0));
    float light = dot(normal, lightDirection);
    float variation = fract(sin(dot(cell, vec2(12.9898,78.233))) * 43758.5453);
    float shade = 1.0 + (light - lightDirection.z) * 0.8;
    shade -= (1.0 - smoothstep(0.30, 0.80, height)) * 0.06;
    shade *= 0.99 + variation * 0.02;
    // Keep the source at full resolution. Averaging a whole stitch also averages away letter strokes.
    vec3 original = texture2D(scene, uv).rgb;
    vec3 knitted = original * shade;
    gl_FragColor = vec4(mix(original, knitted, strength), coverage);
}`;

export interface IKnitRegion {
    bounds: [number, number, number, number];
    radius: number;
}

export interface IKnitRenderOptions {
    width: number;
    height: number;
    stitch: number;
    strength: number;
    editing: [number, number, number, number];
    regions: IKnitRegion[];
}

export interface IKnitRenderer {
    setScene: (image: HTMLImageElement) => void;
    draw: (options: IKnitRenderOptions) => void;
    destroy: () => void;
}

export function createKnitRenderer(canvas: HTMLCanvasElement, yarn: HTMLImageElement): IKnitRenderer | null {
    const gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: false, antialias: false });
    if (!gl) return null;
    const program = gl.createProgram();
    const vertex = gl.createShader(gl.VERTEX_SHADER);
    const fragment = gl.createShader(gl.FRAGMENT_SHADER);
    const buffer = gl.createBuffer();
    const sceneTexture = gl.createTexture();
    const yarnTexture = gl.createTexture();
    const destroy = () => {
        gl.deleteProgram(program);
        gl.deleteShader(vertex);
        gl.deleteShader(fragment);
        gl.deleteBuffer(buffer);
        gl.deleteTexture(sceneTexture);
        gl.deleteTexture(yarnTexture);
    };
    if (!program || !vertex || !fragment || !buffer || !sceneTexture || !yarnTexture) {
        destroy();
        return null;
    }
    gl.shaderSource(vertex, VERTEX_SHADER);
    gl.shaderSource(fragment, FRAGMENT_SHADER);
    gl.compileShader(vertex);
    gl.compileShader(fragment);
    if (!gl.getShaderParameter(vertex, gl.COMPILE_STATUS) || !gl.getShaderParameter(fragment, gl.COMPILE_STATUS)) {
        destroy();
        return null;
    }
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        destroy();
        return null;
    }
    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    for (const [unit, texture] of [
        [0, sceneTexture],
        [1, yarnTexture],
    ] as const) {
        gl.activeTexture(gl.TEXTURE0 + unit);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    }
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, yarn);
    gl.uniform1i(gl.getUniformLocation(program, "scene"), 0);
    gl.uniform1i(gl.getUniformLocation(program, "yarn"), 1);

    return {
        setScene(image) {
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, sceneTexture);
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        },
        draw({ width, height, stitch, strength, editing, regions }) {
            const ratio = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = Math.round(width * ratio);
            canvas.height = Math.round(height * ratio);
            gl.viewport(0, 0, canvas.width, canvas.height);
            gl.uniform2f(gl.getUniformLocation(program, "resolution"), width, height);
            gl.uniform1f(gl.getUniformLocation(program, "stitch"), stitch);
            gl.uniform1f(gl.getUniformLocation(program, "strength"), strength);
            gl.uniform4fv(gl.getUniformLocation(program, "editing"), editing);
            gl.clearColor(0, 0, 0, 0);
            gl.clear(gl.COLOR_BUFFER_BIT);
            // Draw only the component shapes; the surrounding DOM stays visible through the canvas.
            for (const region of regions) {
                gl.uniform4fv(gl.getUniformLocation(program, "componentBounds"), region.bounds);
                gl.uniform1f(gl.getUniformLocation(program, "componentRadius"), region.radius);
                gl.drawArrays(gl.TRIANGLES, 0, 6);
            }
        },
        destroy,
    };
}
