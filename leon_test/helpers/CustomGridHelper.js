import { LineSegments, LineBasicMaterial, Float32BufferAttribute, BufferGeometry, Color } from 'three';

class CustomGridHelper extends LineSegments {

    constructor(size = 10, divisions = 10, block = 5, ratio = 1, color1 = 0x444444, color2 = 0x888888) {

        color1 = new Color(color1);
        color2 = new Color(color2);

        const step = ratio * (size / divisions);
        const halfSize = ratio * (size / 2);

        const vertices = [], colors = [];

        for (let i = 0, j = 0, k = - halfSize; i <= divisions; i++, k += step) {

            vertices.push(- halfSize, k, 0, halfSize, k, 0);
            vertices.push(k, - halfSize, 0, k, halfSize, 0);

            const color = i % block === 0 ? color1 : color2;

            color.toArray(colors, j); j += 3;
            color.toArray(colors, j); j += 3;
            color.toArray(colors, j); j += 3;
            color.toArray(colors, j); j += 3;

        }

        const geometry = new BufferGeometry();
        geometry.setAttribute('position', new Float32BufferAttribute(vertices, 3));
        geometry.setAttribute('color', new Float32BufferAttribute(colors, 3));

        const material = new LineBasicMaterial({ vertexColors: true, toneMapped: false });

        super(geometry, material);

        this.type = 'CustomGridHelper';

	}

	dispose() {

		this.geometry.dispose();
		this.material.dispose();

	}

}

export { CustomGridHelper };