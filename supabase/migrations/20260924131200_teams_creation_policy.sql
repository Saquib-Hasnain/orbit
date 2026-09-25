-- Add INSERT policy for teams table to allow authenticated users to create teams
CREATE POLICY "Authenticated users can create teams"
  ON public.teams FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Add INSERT policy for team_members to allow users to add themselves as owners
CREATE POLICY "Users can add themselves as team owners"
  ON public.team_members FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id AND role = 'owner');

-- Add SELECT policy for users to view team member profiles
CREATE POLICY "Team members can view user profiles"
  ON public.users FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.team_members tm1
      JOIN public.team_members tm2 ON tm1.team_id = tm2.team_id
      WHERE tm1.user_id = auth.uid()
      AND tm2.user_id = users.id
    )
  );
