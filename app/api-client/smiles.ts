export async function generate3D(smiles: string): Promise<string> {
    const response = await fetch('http://localhost:8000/api/smiles-to-3d', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ smiles }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to generate 3D structure');
    }

    const data = await response.json();
    return data.molblock;
}
