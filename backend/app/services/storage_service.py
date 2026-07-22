import os

from app.supabase_client import supabase

BUCKET_NAME = "reports"


def upload_pdf(file_path: str):

    file_name = os.path.basename(file_path)

    with open(file_path, "rb") as f:

        supabase.storage.from_(BUCKET_NAME).upload(
            path=file_name,
            file=f,
            file_options={
                "content-type": "application/pdf"
            }
        )

    public_url = (
        supabase.storage
        .from_(BUCKET_NAME)
        .get_public_url(file_name)
    )

    # Delete local temporary file
    if os.path.exists(file_path):
        os.remove(file_path)

    return public_url