from auth_token import auth_token
from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
import torch
import pipe
from torch import autocast
from diffusers import StableDiffusionPipeline
from io import BytesIO
import base64
from diffusers import StableDiffusionPipeline, DPMSolverMultistepScheduler

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_credentials = True,
    allow_origins = ["*"],
    allow_methods = ["*"],
    allow_headers = ["*"]
)

model_id = "stabilityai/stable-diffusion-2-1"
device = "cuda"
pipe = StableDiffusionPipeline.from_pretrained(model_id, torch_dtype=torch.float16)
pipe.scheduler = DPMSolverMultistepScheduler.from_config(pipe.scheduler.config, use_auth_token = auth_token)
pipe = pipe.to(device)

@app.get("/")
def gen(prompt: str):
    with autocast(device):
        genimg = pipe(prompt, guidance_scale = 8.5).images[0]
    genimg.save("test.png")
    buffer = BytesIO()
    genimg.save(buffer, format = "PNG")
    encimg = base64.b64encode(buffer.getvalue())
    return Response(content=encimg, media_type="image/png")    
    
