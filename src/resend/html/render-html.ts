import { readFileSync } from 'fs';

export function renderTemplate(
  filePath: string,
  variables: Record<string, string>,
) {
  let template = readFileSync(filePath, 'utf-8');
  for (const key in variables) {
    template = template.replace(
      new RegExp(`\\$\\{${key}\\}`, 'g'),
      variables[key],
    );
  }
  return template;
}
