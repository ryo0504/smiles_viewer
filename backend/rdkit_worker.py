from rdkit import Chem
from rdkit.Chem import AllChem

def smiles_to_molblock(smiles: str) -> str:
    mol = Chem.MolFromSmiles(smiles)
    if not mol:
        raise ValueError("Invalid SMILES")
    mol = Chem.AddHs(mol)
    # Generate 3D coords
    res = AllChem.EmbedMolecule(mol, AllChem.ETKDG())
    if res == -1:
        # Try with random coords if embedding fails
        res = AllChem.EmbedMolecule(mol, AllChem.ETKDG(), useRandomCoords=True)
        if res == -1:
             raise ValueError("Failed to generate 3D coordinates")
    
    AllChem.UFFOptimizeMolecule(mol)
    return Chem.MolToMolBlock(mol)
