import { Dialog, DialogContent, DialogTrigger, ZoomImage } from '@/shared/ui';

export const ImageDialog = ({ src }: { src: string }) => (
  <>
    <img src={src} alt="Product picture" className="sm:hidden" />

    <Dialog>
      <DialogTrigger
        render={
          <img
            src={src}
            alt="Product picture"
            className="cursor-pointer max-sm:hidden"
          />
        }
      />
      <DialogContent className="sm:max-w-4xl">
        <ZoomImage src={src} alt="Product picture" zoom={3} />
      </DialogContent>
    </Dialog>
  </>
);
