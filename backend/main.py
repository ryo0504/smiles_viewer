from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from .rdkit_worker import smiles_to_molblock

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SmilesRequest(BaseModel):
    smiles: str

@app.post("/api/smiles-to-3d")
def generate_3d(request: SmilesRequest):
    try:
        molblock = smiles_to_molblock(request.smiles)
        return {"molblock": molblock}
    except ValueError:
        return {"error": "Invalid SMILES"}, 400
    except Exception as e:
        return {"error": str(e)}, 500

@app.get("/")
def read_root():
    return {"status": "ok"}
