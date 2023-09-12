import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): void {
  const documentBuilder = new DocumentBuilder()
    .setTitle('API DOCUMENT')
    .setDescription('Routes is following REST standard (Richardson level 3)')
    .addBearerAuth();

  if (process.env.API_VERSION) {
    documentBuilder.setVersion(process.env.API_VERSION);
  }

  const document = SwaggerModule.createDocument(app, documentBuilder.build());

  SwaggerModule.setup('api-docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  console.info(
    `Api Documentation: http://localhost:${process.env.APP_PORT}/api-docs`,
  );
}
