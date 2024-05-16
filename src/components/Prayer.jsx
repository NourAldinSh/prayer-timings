import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export default function Prayer({ name, time, image }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia component="img" alt="alfajr" height="140" image={image} />
      <CardContent>
        <h2>{name}</h2>
        <Typography variant="h1" color="text.secondary">
          {time}
        </Typography>
      </CardContent>
    </Card>
  );
}
