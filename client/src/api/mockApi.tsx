import type { Node, Edge } from "@xyflow/react";

export function fetchApps(): Promise<string[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.2) {
        reject(new Error("Failed to load apps"));
      } else {
        resolve(["supertokens-golang", "supertokens-java", "supertokens-python", "supertokens-ruby"]);
      }
    }, 800);
  });
}

export function fetchGraph(appId: string): Promise<{
  nodes: Node[];
  edges: Edge[];
}> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.2) {
        reject(new Error("Failed to load graph"));
      } else {
        resolve({
          nodes: [
            {
              id: `${appId}`,
              type: "service",
              position: { x: 200, y: 100 },
              data: {
                title: `${appId}`,
                status: "Healthy",
                cpu: 40,
                description: "",
              },
            },
          ],
          edges: [],
        });
      }
    }, 800);
  });
}
